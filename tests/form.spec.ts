import { test, expect, chromium, FullConfig, Page } from '@playwright/test';
import { MainPage } from './page/mainPage';
import { FormPage } from './page/form';

let mainPage: MainPage;
let formPage: FormPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  mainPage = new MainPage(page);
  formPage = new FormPage(page);
  await mainPage.navigate();
  console.log('✓ Setup completed - all tests will use form page session');
});

test.describe.serial('Form tests', () => {

  // test('Navigate to form page', async ({ page }) => {
  //   await mainPage.navigate();
  //   await expect(page).toHaveURL('https://voceapacientului.md/');
  // });

  test('Click the first button', async ({ page }) => {
    await formPage.clickFirstButton();
  });

  test('Check elements and submit first page', async ({ page }) => {
    await formPage.verifyFirstPageElements();
    await formPage.submitFirstPageElements();
  });

  test('Check elements and submit second page', async ({ page }) => {
    await formPage.verifySecondPageElements();
    await formPage.submitSecondPageElements();
  });

});