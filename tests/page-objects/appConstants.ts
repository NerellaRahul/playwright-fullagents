export const APP_BASE_URL = 'https://www.saucedemo.com';

export type ProductName =
  | 'Sauce Labs Backpack'
  | 'Sauce Labs Bike Light'
  | 'Sauce Labs Bolt T-Shirt'
  | 'Sauce Labs Fleece Jacket'
  | 'Sauce Labs Onesie'
  | 'Test.allTheThings() T-Shirt (Red)';

export function productSlug(productName: ProductName): string {
  return productName.toLowerCase().replace(/\s+/g, '-');
}
