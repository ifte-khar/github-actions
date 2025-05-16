import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


export class LoginPage {
  readonly page: Page;
  readonly usernameTextfield: Locator;
  readonly passwordTextfield: Locator;
  readonly loginButton: Locator;
  readonly loginDropdownButton: Locator;
  readonly acceptCookiesButton: Locator;


  constructor(page: Page) {
    this.page = page;


    this.loginDropdownButton = page.locator('a.nav-link.dropdown-toggle >> text=Logga in');
    this.usernameTextfield = page.locator('role=textbox[name="Användarnamn"]');
    this.passwordTextfield = page.locator('role=textbox[name="Lösenord"]');
    this.loginButton = page.locator('#popLoginForm').getByRole('button', { name: 'Logga in', exact: true });
    this.acceptCookiesButton = page.getByRole('button', { name: 'Tillåt alla' });
  }


  // Method to open the login dropdown
  async openLoginDropdown() {
    await this.loginDropdownButton.click();
    await this.usernameTextfield.waitFor({ state: 'visible', timeout: 60000 });
  }


  async goto() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL is not defined in environment variables');
    }
    await this.page.goto(baseUrl);
  }


  async performLogin(username: string, password: string) {
    await this.usernameTextfield.fill(username);
    await this.passwordTextfield.fill(password);
    await this.loginButton.waitFor({ state: 'visible', timeout: 60000 });
    await this.loginButton.click();
  }


  async acceptCookiesIfVisible() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }
}
