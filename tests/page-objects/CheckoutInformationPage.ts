import type { Locator, Page } from '@playwright/test';

export class CheckoutInformationPage {
  constructor(private readonly page: Page) {}

  get pageTitle(): Locator {
    return this.page.getByText('Checkout: Your Information', { exact: true });
  }

  get firstNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  get lastNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  get postalCodeInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
  }

  get errorMessage(): Locator {
    return this.page.getByRole('alert');
  }

  get continueButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}
