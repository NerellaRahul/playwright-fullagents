import type { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  constructor(private readonly page: Page) {}

  get productName(): Locator {
    return this.page.locator('.inventory_details_name');
  }

  get productPrice(): Locator {
    return this.page.locator('.inventory_details_price');
  }

  async backToProducts(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back to products' }).click();
  }
}
