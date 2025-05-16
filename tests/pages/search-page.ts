import { type Locator, type Page } from '@playwright/test';

export class SearchPage {


  readonly page: Page;
  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly productResults: Locator;
  readonly productCountText: Locator;
  readonly onlyInStockFilter: Locator;
  readonly filterToggleButton: Locator;


  constructor(page: Page) {
    this.page = page;


    // Search field using placeholder text
    this.searchField = page.locator('input[placeholder="Här kan du söka på artikelnummer, kategori, produktnamn eller text"]');


    // Locator for the search button
    this.searchButton = page.locator('button.knapp-sok');
    this.filterToggleButton = page.getByText('Filter', { exact: true });
    this.onlyInStockFilter = page.getByText('Visa endast lagerförda');
    // Locator for the product results container
    this.productResults = page.locator('.product-item');
  }


  // Method to search for products
  async searchForProduct(query: string) {
    await this.searchField.fill(query);
    await this.searchButton.click();
  }
  // Toggle the filter sidebar
  async openFilter() {
    await this.filterToggleButton.click();
  }


  // Click "Visa endast lagerförda"
  async filterOnlyInStock() {
    await this.onlyInStockFilter.click();
  }
  // Method to get the number of search results
  async getNumberOfSearchResults() {
    return this.productResults.count();
  }


  // Wait for the search results container to appear
  async waitForResults() {
    await this.page.waitForSelector('.product-item', { timeout: 60000 });
  }
}
