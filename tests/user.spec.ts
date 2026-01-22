import { UserPage } from './page/users';
import { MainPage } from './page/mainPage'; 
import { test, expect, chromium, FullConfig, Page } from '@playwright/test';

let mainPage: MainPage;
let userPage: UserPage;   

test.beforeAll(async ({ browser }) => {
  // This runs ONCE before all tests in this file
  const context = await browser.newContext();
  const page = await context.newPage();
  
  mainPage = new MainPage(page);
  userPage = new UserPage(page);
  
  // Login once
  await mainPage.navigate();
  await mainPage.openAuthPopup();
  await mainPage.login('Admin', 'qwert12');
  
  console.log('✓ Login completed - all tests will use user page session');
});

test.describe.serial('User tests', () => {

    test('User menu items exist', async ({ page }) => { 
        await userPage.verifyUserPageVisible();  
        await userPage.verifyUserPageClickable();
    });

    test('Search user functionality', async ({ page }) => { 
        await userPage.verifySearchingVisible();
    });

    test('Institution user functionality', async ({ page }) => { 
        await userPage.verifyInstitutionVisible();
    });

    test('Period user functionality', async ({ page }) => { 
        await userPage.verifyPeriodVisible();
    });

    test('Check new user functionality',async ({ page }) => {
        await userPage.clickAddUserButton();
    });

    test('Check form elements functionality',async ({ page }) => {
        await userPage.verifyFormElements();
    });

    test('Fill form elements functionality',async ({ page }) => {
        await userPage.fillFormElements();
        await userPage.checkRequiredElements();
    });

    test('Verify submit button functionality',async ({ page }) => {
        await userPage.submitForm();
    });

    test('Verify column header visibility',async ({ page }) => {
        await userPage.isColumnHeaderVisible();
    });

    test('Edit first table row information',async ({ page }) => {
        await userPage.clickFirstTableRow();
    });
});

function beforeEach(arg0: ({ page }: { page: any; }) => Promise<void>, arg1: void) {
    throw new Error('Function not implemented.');
}