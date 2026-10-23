import type { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  get pageTitle(): Locator {
    return this.page.getByText('Checkout: Complete!', { exact: true });
  }

  get confirmationHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  get cartLink(): Locator {
    return this.page.getByRole('button', { name: 'Cart, empty' });
  }
}
