import { expect, type Locator, type Page } from '@playwright/test';


export class LeveransAdressPage {
  readonly page: Page;


  readonly minaLeveransadresserLink: Locator;
  readonly skapaNyAdressButton: Locator;
  readonly sokUppAdressButton: Locator;
  readonly gatuadressField: Locator;
  readonly postadressField: Locator;
  readonly sokButton: Locator;
  readonly searchResult: Locator;
  readonly suggestionBox: Locator;
  readonly nummerField: Locator;
  readonly adressatField: Locator;
  readonly saveFirstButton: Locator;
  readonly addressLabelField: Locator;
  readonly saveFinalButton: Locator;
  readonly confirmationText: (label: string) => Locator;


  constructor(page: Page) {
    this.page = page;


    this.minaLeveransadresserLink = page.getByRole('link', { name: 'Mina leveransadresser' });
    this.skapaNyAdressButton = page.getByRole('button', { name: 'Skapa ny adress' });
    this.sokUppAdressButton = page.getByRole('button', { name: 'Sök upp adress' });
    this.gatuadressField = page.getByRole('textbox', { name: 'Gatuadress' });
    this.postadressField = page.getByRole('textbox', { name: 'Postadress' });
    this.sokButton = page.getByRole('button', { name: 'Sök' });
    this.searchResult = page.locator('[id="\\31 00901793"]');
    this.suggestionBox = page.locator('#AdressAutoDiv div').filter({ hasText: 'Otillåtet tecken har raderats' }).nth(1);
    this.nummerField = page.getByRole('textbox', { name: 'Nr', exact: true });
    this.adressatField = page.getByRole('textbox', { name: 'Adressat' });
    this.saveFirstButton = page.getByRole('button', { name: 'Spara' });
    this.addressLabelField = page.getByRole('textbox', { name: 'Adressens benämning (visas ej' });
    this.saveFinalButton = page.getByRole('button', { name: 'Spara' });
    this.confirmationText = (label: string) => page.getByText(`Adressen ${label} skapad`);
  }


  async goToLeveransAdress() {
    await this.minaLeveransadresserLink.click();
  }


  async clickCreateNewAddress() {
    await this.skapaNyAdressButton.click();
  }


  async searchAddress(street: string, zip: string) {
    await this.sokUppAdressButton.click();
    await this.gatuadressField.fill(street);
    await this.postadressField.fill(zip);
    await this.sokButton.click();
    await this.searchResult.click();


    if (await this.suggestionBox.isVisible()) {
      await this.suggestionBox.click();
    }
  }


  async fillAddressDetails(number: string, recipient: string) {
    await this.nummerField.fill(number);
    await this.adressatField.fill(recipient);
    await this.saveFirstButton.click();
  }


  async saveAddressLabel(label: string) {
    await this.addressLabelField.fill(label);
    await this.saveFinalButton.click();
  }


  async verifyAddressSaved(label: string) {
    await expect(this.confirmationText(label)).toBeVisible();
  }


  async createNewAddress(details: {
    street: string;
    zip: string;
    number: string;
    recipient: string;
    label: string;
  }) {
    await this.clickCreateNewAddress();
    await this.searchAddress(details.street, details.zip);
    await this.fillAddressDetails(details.number, details.recipient);
    await this.saveAddressLabel(details.label);
  }
}
