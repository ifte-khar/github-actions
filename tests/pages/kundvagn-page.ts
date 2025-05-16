import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class KundvagnPage {
  readonly page: Page;
  readonly quantityDropdown: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly checkoutLink: Locator;
  readonly continueButton: Locator;


  constructor(page: Page) {
    this.page = page;


    this.quantityDropdown = page.locator('#antalDropdown');
    this.addToCartButton = page.getByRole('button', { name: '' });


    this.cartLink = page.getByRole('link', { name: '' });
 
    this.checkoutLink = page.getByRole('link', { name: 'Till kassa' });
    this.continueButton = page.getByText('Vidare');
  }


  async selectQuantity() {
    await this.quantityDropdown.click();
  }


  async addToKundvagn() {
    await this.addToCartButton.click();
  }


  async goToKundvagn() {
    await this.cartLink.click();
  }


  async proceedToCheckout() {
    await this.checkoutLink.click();
  }


  async continueFromCheckoutPage() {
    await this.continueButton.click();
  }


  async verifyOnCheckoutPage() {
    await expect(this.page).toHaveURL(/.*\/kassa$/);


  }
}
