import { expect, test } from '@playwright/test';
import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Core Shopper Operations', () => {
  test('01 - Sign in and reject invalid or locked-out credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Start at Sauce Demo and inspect the login form.
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 2. Submit the form with a valid listed username and an incorrect password.
    await loginPage.signIn('standard_user', 'wrong_password');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );

    // 3. Enter valid standard-user credentials and select Login.
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // 4. Sign out, then try the locked-out account from a signed-out state.
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await loginPage.signIn('locked_out_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});
