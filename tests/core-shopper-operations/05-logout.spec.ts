import { expect, test } from '@playwright/test';
import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Core Shopper Operations', () => {
  test('05 - Log out and verify session exit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Sign in with standard_user and secret_sauce.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // 2. Open the navigation menu and select Logout.
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();

    // 3. Attempt to access the inventory URL directly after logout.
    await inventoryPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});
