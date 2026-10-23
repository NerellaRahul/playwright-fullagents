import { expect, test } from '@playwright/test';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutCompletePage } from '../page-objects/CheckoutCompletePage';
import { CheckoutInformationPage } from '../page-objects/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../page-objects/CheckoutOverviewPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Core Shopper Operations', () => {
  test('04 - Validate checkout details and place an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // 1. Sign in and add Sauce Labs Onesie and Sauce Labs Backpack.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await inventoryPage.addProduct('Sauce Labs Onesie');
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 2. Open cart, begin checkout, then continue with all customer fields blank.
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInformationPage.continue();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutInformationPage.pageTitle).toHaveText('Checkout: Your Information');
    await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');

    // 3. Enter customer information and verify the order overview and calculated totals.
    await checkoutInformationPage.fillCustomerInformation('Casey', 'Tester', '10001');
    await checkoutInformationPage.continue();
    await expect(checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
    await expect(checkoutOverviewPage.productNames).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Backpack',
    ]);
    await expect(checkoutOverviewPage.paymentInformation).toHaveText('SauceCard #31337');
    await expect(checkoutOverviewPage.shippingInformation).toHaveText('Free Pony Express Delivery!');
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $37.98');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $3.04');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $41.02');

    // 4. Finish checkout and verify the order confirmation and empty cart.
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.pageTitle).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.confirmationHeading).toBeVisible();
    await expect(checkoutCompletePage.cartLink).toHaveAccessibleName('Cart, empty');
  });
});
