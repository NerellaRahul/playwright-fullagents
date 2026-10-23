import { expect, test } from '@playwright/test';
import { CartPage } from '../page-objects/CartPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Core Shopper Operations', () => {
  test('03 - Add, review, and remove items in the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Sign in with standard_user and verify Products with an empty cart.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    // 2. Add Sauce Labs Onesie and Sauce Labs Backpack to the cart.
    await inventoryPage.addProduct('Sauce Labs Onesie');
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await expect(inventoryPage.removeButton('Sauce Labs Onesie')).toBeVisible();
    await expect(inventoryPage.removeButton('Sauce Labs Backpack')).toBeVisible();

    // 3. Open the cart and verify both products, quantities, and available actions.
    await inventoryPage.openCart();
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.productNames).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Backpack',
    ]);
    await expect(cartPage.quantities).toHaveText(['1', '1']);
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    // 4. Remove Sauce Labs Onesie and verify the Backpack remains.
    await cartPage.removeProduct('Sauce Labs Onesie');
    await expect(cartPage.cartBadge).toHaveText('1');
    await expect(cartPage.productNames).toHaveText(['Sauce Labs Backpack']);

    // 5. Remove Sauce Labs Backpack and verify the cart is empty.
    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.productRows).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });
});
