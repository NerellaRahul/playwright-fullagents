import type { Locator, Page } from '@playwright/test';
import { APP_BASE_URL } from './appConstants';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get errorMessage(): Locator {
    return this.page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto(APP_BASE_URL);
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
