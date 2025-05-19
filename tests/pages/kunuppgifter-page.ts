import { expect, type Locator, type Page } from '@playwright/test';

export class KunduppgifterPage {
  readonly page: Page;
  readonly minaSidorLink: Locator;
  readonly minaKunduppgifterLink: Locator;
  readonly bytKundnummerButton: Locator;
  readonly kundTextbox: Locator;
  readonly sokButton: Locator;
  readonly valjButton: Locator;
  readonly andraButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.minaSidorLink = page.getByRole('link', { name: 'Mina sidor' });
    this.minaKunduppgifterLink = page.getByRole('link', { name: 'Mina kunduppgifter' });
    this.bytKundnummerButton = page.getByRole('button', { name: 'Byt kundnummer' });
    this.kundTextbox = page.getByRole('textbox', { name: 'Kund', exact: true });
    this.sokButton = page.getByRole('button', { name: 'Sök' });
    this.valjButton = page.getByRole('button', { name: 'Välj' });
    this.andraButton = page.getByRole('button', { name: 'Ändra till valt kundnr' });
  }

  async changeCustomerNumber(customerNumber: string) {
    await this.minaSidorLink.click();
    

    await this.minaKunduppgifterLink.click();
  
    await this.bytKundnummerButton.click();

    await this.kundTextbox.waitFor({ state: 'visible', timeout: 10000 });
    await this.kundTextbox.fill(customerNumber);

    await this.sokButton.click();
    await this.valjButton.click();

    await this.andraButton.click();
  }
}
