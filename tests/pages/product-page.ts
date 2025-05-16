import { Locator, Page, expect } from '@playwright/test';


export class ProductPage {
  readonly page: Page;
  readonly resultItems: Locator;
  readonly totalCountText: Locator;


  constructor(page: Page) {
    this.page = page;


    // Main result container
    this.resultItems = page.locator('div.sokresultat.js-sokresultat');


    // Total count
    this.totalCountText = page.locator('span.total-count span.value.js-antal');
  }


  // Wait until the container is visible
  async waitForResults() {
    await expect(this.resultItems).toBeVisible({ timeout: 20000 });
  }


  // Extract total count from "...... st"
  async getTotalCount(): Promise<number> {
    const text = await this.totalCountText.textContent();
    const match = text?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}


