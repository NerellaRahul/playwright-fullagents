import { expect, test } from '@playwright/test';
import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductDetailsPage } from '../page-objects/ProductDetailsPage';

test.describe('Core Shopper Operations', () => {
  test('02 - Browse, inspect, and sort the product catalog', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // 1. Sign in with standard_user and secret_sauce.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.sortDropdown).toBeVisible();

    // 2. Select Price (low to high) in the product sort dropdown.
    await inventoryPage.sortProducts('lohi');
    await expect(inventoryPage.productNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.productPrices.first()).toHaveText('$7.99');
    await expect(inventoryPage.productNames.last()).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.productPrices.last()).toHaveText('$49.99');

    // 3. Select Name (Z to A).
    await inventoryPage.sortProducts('za');
    await expect(inventoryPage.sortDropdown).toHaveValue('za');
    await expect(inventoryPage.productNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(inventoryPage.productNames.last()).toHaveText('Sauce Labs Backpack');

    // 4. Open the Sauce Labs Backpack product details, then return to the catalog.
    await inventoryPage.openProduct('Sauce Labs Backpack');
    await expect(productDetailsPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(productDetailsPage.productPrice).toHaveText('$29.99');
    await productDetailsPage.backToProducts();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
