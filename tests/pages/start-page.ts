import { expect, type Locator, type Page } from "@playwright/test";
export class StartPage {


  readonly page: Page;
  readonly shopLink: Locator;
  readonly myPagelink: Locator;
  readonly productsLink: Locator;
  readonly salesLink: Locator;
  readonly searchField: Locator;
  readonly searchCategory: Locator;
  readonly searchButton: Locator;
  readonly loginButton: Locator;
  readonly createClientButton: Locator;
  readonly loginwithBankIdButton: Locator;
  readonly fogetPasswordButton: Locator;
 


  constructor(page: Page) {
    this.page = page;


    // Main navigation and search
    this.myPagelink = page.getByRole('link', { name: 'Mina sidor' });


    this.shopLink = page.getByRole('button', { name: 'Shop' })
    this.productsLink = page.getByRole('link', { name: 'Produkter' })
    this.salesLink = page.getByRole('link', { name: 'Utförsäljning' })
    this.searchField = page.getByRole('searchbox', { name: 'Här kan du söka på' })
    this.searchCategory = page.locator('#sokKatDropdown')
    //this.searchButton = page.getByRole('button', { name: '' })
    // In your StartPage class
    this.searchButton = page.locator('button.knapp-sok');


    


    // Auth and account actions
    this.loginButton = page.locator('text=Logga in');
    this.createClientButton = page.locator('text=Skapa ny kund');
    this.loginwithBankIdButton = page.locator('text=Logga in med BankId');
    this.fogetPasswordButton = page.locator('text= Glömt lösenordet');
  }


  // Navigation methods
  async gotoMinaSidor() {
    await this.myPagelink.click();
  }


  async gotoShop() {
    await this.shopLink.click();


  }


  async gotoProdukter() {
    await this.productsLink.click();
  }


  async gotoUtforsaljning() {
    await this.salesLink.click();
  }


  // Search functionality
  async searchProducts(query: string) {
    await this.searchField.fill(query);
    await this.searchButton.click();
  }


  async selectCategory(category: string) {
    await this.searchCategory.selectOption({ label: category });
  }


  // Authentication related actions
  async logIn() {
    await this.loginButton.click();
  }


  async createNewClient() {
    await this.createClientButton.click();
  }


  async loninwithBankId() {
    await this.loginwithBankIdButton.click();
  }


  async fogetPassword() {
    await this.fogetPasswordButton.click();
  }




  async verifyStartPageIsVisible() {
    await expect(this.myPagelink).toBeVisible();
    await expect(this.shopLink).toBeVisible();
    await expect(this.productsLink).toBeVisible();
    await expect(this.salesLink).toBeVisible();
    await expect(this.searchField).toBeVisible();
 
}




  async gotoSnabborderPage() {
    await this.shopLink.click();
    const snabborderLink = this.page.getByRole('link', { name: 'Snabborder' });
    await snabborderLink.waitFor({ state: 'visible' });
    await snabborderLink.click();
    await this.page.waitForLoadState('domcontentloaded');
}




  async gotoclientinformation() {
    await this.myPagelink.click();
    const clientInformation = this.page.getByRole('link', { name: 'Mina användaruppgifter' });
   
    await this.myPagelink.waitFor({ state: 'visible' });
    await clientInformation.click();
  //await this.page.waitForLoadState('domcontentloaded');




}


}
