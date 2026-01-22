import { test, expect } from '@playwright/test';
import { MainPage } from './page/mainPage';

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.navigate();

  // Click the authentication button
  const loginBtn = page.locator('text=Autentificare');
  await loginBtn.click();
});

test.describe.serial('Authentication tests', () => {
  test('Authentication popup opens when clicking login button', async ({ page }) => {
    
    // Wait for popup to appear and verify it contains "Autentificare" text
    const authPopup = page.locator('text=Autentificare').first();
    await expect(authPopup).toBeVisible();

    await mainPage.verifyAuthPopupElements();
  });

  // test('Login with username only (edge case)', async ({ page }) => {
  //   // Fill only username
  //   const usernameField = page.locator('input[placeholder="Utilizator"]');
  //   await usernameField.fill('Something');
    
  //   // Try to submit
  //   const submitBtn = page.locator('button[type="submit"]:has-text("Intră")');
  //   await submitBtn.click();
    
  //   // Verify we're still on the same page (login should fail or show error)
  //   await expect(page).not.toHaveURL(/\/dashboard/);
  // });

  // test('Checkbox interaction works correctly', async ({ page }) => {  
  //   const checkbox = page.locator('input[type="checkbox"]');
    
  //   // Verify initial state is unchecked
  //   await expect(checkbox).not.toBeChecked();
    
  //   // Click checkbox
  //   await checkbox.click();
    
  //   // Verify it's now checked
  //   await expect(checkbox).toBeChecked();
    
  //   // Click again to uncheck
  //   await checkbox.click();
    
  //   // Verify it's unchecked again
  //   await expect(checkbox).not.toBeChecked();
  // });

  // test('Forgot password button is clickable', async ({ page }) => {   
  //   const forgotPasswordBtn = page.locator('button:has-text("Ai uitat parola?")');
  //   await expect(forgotPasswordBtn).toBeVisible();
  //   await expect(forgotPasswordBtn).toBeEnabled();
    
  //   // Click the button (you can add assertions for expected behavior)
  //   await forgotPasswordBtn.click();
  //   await expect(page.locator('text=Recuperează parola').first()).toBeVisible();

  //   // Add verification for what should happen after clicking
  //   const emailField = page.locator('input[placeholder="Email"]');
  //   const submitBtn = page.getByRole('button', { name: 'Recuperează parola', exact: true });
  //   const backBtn = page.getByRole('button', { name: 'Înapoi', exact: true });

  //   await expect(emailField).toBeVisible();
  //   await expect(submitBtn).toBeVisible();
  //   await expect(backBtn).toBeVisible();

  //   await emailField.fill('test@example.com');
  //   await submitBtn.click();
    
  //   await backBtn.click();

  //   await expect(forgotPasswordBtn).toBeVisible(); 
  // })

  test('Successful login redirects to dashboard', async ({ page }) => {    
    // Fill in the username field
    const usernameField = page.locator('input[placeholder="Utilizator"]');
    await usernameField.fill('Admin');
    
    // Fill in the password field
    const passwordField = page.locator('input[placeholder="Parola"]');
    await passwordField.fill('qwert12');
    
    // Click submit button
    const submitBtn = page.locator('button[type="submit"]:has-text("Intră")');
    await submitBtn.click();
    
    // Wait for navigation to dashboard
    await page.waitForURL('https://voceapacientului.md/dashboard', { timeout: 10000 });
    
    // Verify we're on the dashboard page
    await expect(page).toHaveURL(/\/dashboard/);

    await page.context().storageState({ path: 'storage/auth.json' });
  });
});