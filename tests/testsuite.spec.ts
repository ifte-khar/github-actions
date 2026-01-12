import { test, expect } from '@playwright/test';
import { StartPage } from './pages/start-page';
import { LoginPage } from './pages/login-page';
import { SearchPage } from './pages/search-page';
import { ProductPage } from './pages/product-page';
import { SnabborderPage } from './pages/snabborder-page';
import { KundvagnPage } from './pages/kundvagn-page';
import { LeveransAdressPage} from './pages/leveransadress-page';
import { KunduppgifterPage } from './pages/kunuppgifter-page';


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.acceptCookiesIfVisible();
  await loginPage.openLoginDropdown();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
});




test.describe('Sonepar Login Test Suite', () => {
  });


  test('Test Case 1: Login and Startpage Overview', async ({ page }) => {


  //Verifiera så att det visas alla knapper efter inlogning
    const startPage = new StartPage(page);
    await startPage.verifyStartPageIsVisible();
    //Verifiera obejktnamn
    const expectedName = `${process.env.TEST_USERNAME} Obj: grundobj`;
    await expect(
    page.getByRole('button', { name: expectedName })).toBeVisible();




});


test('Test Case 2: Search for "SKRUVDRAGARE" and ensure more than 1 result', async ({ page }) => {
 
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
     
    await searchPage.searchForProduct('SKRUVDRAGARE');
    await productPage.waitForResults();
     
    const count = await productPage.getTotalCount();
    expect(count).toBeGreaterThan(1);
 
  });


test('Test Case 3: Lägg till produkter i snabborder', async ({ page }) => {




    const startPage = new StartPage(page);
    await startPage.gotoSnabborderPage();


    const snabborder = new SnabborderPage(page);
    await snabborder.addItemToCart('1377703');
    await snabborder.verifyCartItemCount(1);
});


test('Test case 4: Add product to cart and proceed to checkout', async ({ page }) => {
    const startPage = new StartPage(page);
    const kundvagnPage = new KundvagnPage(page);
    // Sök efter produkt
    await startPage.searchField.click();
    await startPage.searchField.fill('SKRUVDRAGARE M18 FDD3-502X');
    await startPage.searchButton.click();
    await page.waitForSelector('text="SKRUVDRAGARE M18 FDD3-502X"');

    // Lägg till produkt i kundvagnen
    await kundvagnPage.selectQuantity();
    await kundvagnPage.addToKundvagn();
    // Gå till kundvagnen och vidare till kassan
    await kundvagnPage.goToKundvagn();
    await kundvagnPage.proceedToCheckout();
    await kundvagnPage.continueFromCheckoutPage();
 
    // Verifiera att vi är på kassasidan
    await kundvagnPage.verifyOnCheckoutPage();
 
 
});


test('Test Case 5: Lägg till ny leveransadress', async ({ page }) => {
 
  const startPage = new StartPage(page);
  await startPage.gotoMinaSidor();


  const deliveryAddressPage = new LeveransAdressPage(page);
  await deliveryAddressPage.goToLeveransAdress();


  await deliveryAddressPage.createNewAddress({
    street: 'Askersundsgatan',
    zip: '12467',
    number: '6',
    recipient: 'testadress',
    label: 'testadress'
  });


  await deliveryAddressPage.verifyAddressSaved('testadress');
});


test('Test Case 6: Kunduppgifter', async ({ page }) => {
  const startPage = new StartPage(page);
  await startPage.gotoMinaSidor();

  const kunduppgifter = new KunduppgifterPage(page);
  await kunduppgifter.changeCustomerNumber('13047');
});
