import type { Locator, Page } from '@playwright/test';
import { APP_BASE_URL, productSlug, type ProductName } from './appConstants';

export type ProductSortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  get pageTitle(): Locator {
    return this.page.getByText('Products', { exact: true });
  }

  get productCards(): Locator {
    return this.page.locator('.inventory_item');
  }

  get productNames(): Locator {
    return this.page.locator('.inventory_item_name');
  }

  get productPrices(): Locator {
    return this.page.locator('.inventory_item_price');
  }

  get sortDropdown(): Locator {
    return this.page.getByRole('combobox', { name: 'Sort products' });
  }

  get cartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(`${APP_BASE_URL}/inventory.html`);
  }

  async sortProducts(option: ProductSortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async openProduct(productName: ProductName): Promise<void> {
    await this.page
      .getByRole('button', { name: `View details for ${productName}` })
      .last()
      .click();
  }

  async addProduct(productName: ProductName): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug(productName)}"]`).click();
  }

  removeButton(productName: ProductName): Locator {
    return this.page.locator(`[data-test="remove-${productSlug(productName)}"]`);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }
}
