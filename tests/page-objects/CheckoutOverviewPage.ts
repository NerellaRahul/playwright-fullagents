import type { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  get pageTitle(): Locator {
    return this.page.getByText('Checkout: Overview', { exact: true });
  }

  get productNames(): Locator {
    return this.page.locator('.inventory_item_name');
  }

  get paymentInformation(): Locator {
    return this.page.getByText('SauceCard #31337', { exact: true });
  }

  get shippingInformation(): Locator {
    return this.page.getByText('Free Pony Express Delivery!', { exact: true });
  }

  get itemTotal(): Locator {
    return this.page.getByText('Item total: $37.98', { exact: true });
  }

  get tax(): Locator {
    return this.page.getByText('Tax: $3.04', { exact: true });
  }

  get total(): Locator {
    return this.page.getByText('Total: $41.02', { exact: true });
  }

  get finishButton(): Locator {
    return this.page.getByRole('button', { name: 'Finish' });
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
