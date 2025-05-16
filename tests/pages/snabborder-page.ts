import { expect, Locator, Page } from '@playwright/test';
//import dotenv from 'dotenv';
//dotenv.config();


export class SnabborderPage {
    readonly page: Page;
    readonly artikelnummerInput: Locator;
    readonly redainField: Locator;
    readonly addtocartItem: Locator;
    readonly cartItemCount: Locator;
    readonly shopLink: Locator;
    readonly cartIconText: Locator;


constructor(page: Page) {
    this.page = page;
   
    this.artikelnummerInput = page.locator('#artikelNummerLista');
    this.redainField = page.getByRole('button', { name: 'Läs in artikelnummer (och ev' });


    //this.addtocartItem = page.locator('button[type="submit"]');
    this.addtocartItem = page.getByRole('button', { name: 'Lägg artiklarna i kundvagnen ' })
    this.cartItemCount = page.locator('div.undermeny-kundvagn a span');
    this.cartIconText = page.locator('div.undermeny-kundvagn a span');


    }


async addItemToCart(artikelnummer: string) {
    await this.artikelnummerInput.fill(artikelnummer);
    await this.redainField.click();
    await this.addtocartItem.click();
    // Optional short wait for UI update
    await this.page.waitForTimeout(1000);
    }
       
async verifyCartItemCount(expectedCount: number) {
    await expect(this.cartIconText).toContainText(expectedCount.toString());
}


     
}
