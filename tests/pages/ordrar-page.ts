import { expect, Locator, type Page } from '@playwright/test';


export class OrderPage {
  readonly page: Page;
  readonly ordrarLink: Locator;
  readonly objektButton: Locator;
  readonly startDateCalendarButton: Locator;
  readonly endDateCalendarButton: Locator;
  readonly calendar: Locator;
  readonly totalAmountText: Locator;
  readonly orderStatusDropdown: Locator;


constructor(page: Page) {
    this.page = page;


    this.ordrarLink = page.getByRole('link', { name: 'Ordrar', exact: true });
    this.objektButton = page.locator('#Grunddata i');
    this.startDateCalendarButton = page.locator('.input-group > .input-group-addon').first();
    this.endDateCalendarButton = page.locator('div:nth-child(2) > .input-group > .input-group-addon');
    this.calendar = page.locator('#ui-datepicker-div');
    this.totalAmountText = page.getByText(/^Totalbelopp:/);
    this.orderStatusDropdown = page.getByLabel('Orderstatus');
  }


async navigateToOrders() {
    await this.ordrarLink.click();
    await this.objektButton.first().click();
  }


async openStartDateCalendar() {
    await this.startDateCalendarButton.click();
  }


async openEndDateCalendar() {
    await this.endDateCalendarButton.click();
  }


async selectCalendarDateByValue(year: string, monthValue: string, day: string) {
    const monthDropdown = this.calendar.getByRole('combobox').first();
    const yearDropdown = this.calendar.getByRole('combobox').nth(1);


    await monthDropdown.selectOption(monthValue); // 0 = Jan
    await yearDropdown.selectOption(year);
    await this.calendar.getByRole('link', { name: day, exact: true }).click();
  }


async setStaticDateRange() {
    await this.openStartDateCalendar();
    await this.selectCalendarDateByValue('2025', '0', '1'); // Jan 1, 2025


    await this.openEndDateCalendar();
    await this.selectCalendarDateByValue('2025', '3', '28'); // Apr 28, 2025
  }


async selectOrderStatus() {
    await this.orderStatusDropdown.selectOption({ label: 'Levererad/Fakturerad/Krediterad' });
  }


async selectReturnOrdersOnly() {
    await this.page.getByText('Order/Returorder').click();
    //await this.page.getByText('Returorder', { exact: true }).click();
  }


async searchOrders() {
    await this.page.getByRole('button', { name: 'Sök' }).click();
  }


async verifyTotalAmountAboveOneKr() {
    const totalText = await this.totalAmountText.innerText();
    const match = totalText.match(/Totalbelopp:\s*([\d.,]+)\s*kr/);


    if (!match) throw new Error('Could not find total amount text');


    const amount = parseFloat(match[1].replace(',', '.'));
    expect(amount).toBeGreaterThan(669);
  }
}
