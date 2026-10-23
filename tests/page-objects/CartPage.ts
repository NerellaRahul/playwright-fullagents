import type { Locator, Page } from '@playwright/test';
import { productSlug, type ProductName } from './appConstants';

export class CartPage {
  constructor(private readonly page: Page) {}

  get pageTitle(): Locator {
    return this.page.getByText('Your Cart', { exact: true });
  }

  get productRows(): Locator {
    return this.page.locator('.cart_item');
  }

  get productNames(): Locator {
    return this.page.locator('.cart_item .inventory_item_name');
  }

  get quantities(): Locator {
    return this.page.locator('.cart_quantity');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get checkoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  async removeProduct(productName: ProductName): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug(productName)}"]`).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
