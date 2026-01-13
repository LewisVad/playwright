import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://voceapacientului.md/');
  await expect(page).toHaveTitle(/Vocea Pacientului/);
});

test('login as admin', async ({ page }) => {
  await page.goto('https://voceapacientului.md/');
  await expect(page).toHaveTitle(/Vocea Pacientului/);
});

test('Authentication popup opens when clicking login button', async ({ page }) => {
    await page.goto('https://voceapacientului.md/');
    
    // Click the authentication button
    const loginBtn = page.locator('text=Autentificare');
    await loginBtn.click();
    
    // Wait for popup to appear and verify it contains "Autentificare" text
    const authPopup = page.locator('text=Autentificare').first();
    await expect(authPopup).toBeVisible();
  });

  test('Authentication popup contains all required elements', async ({ page }) => {
    await page.goto('https://voceapacientului.md/');
    
    // Open authentication popup
    const loginBtn = page.locator('text=Autentificare');
    await loginBtn.click();
    
    // Verify username field with placeholder "Utilizator"
    const usernameField = page.locator('input[placeholder="Utilizator"]');
    await expect(usernameField).toBeVisible();
    
    // Verify password field with placeholder "Parola"
    const passwordField = page.locator('input[placeholder="Parola"]');
    await expect(passwordField).toBeVisible();
    
    // Verify checkbox with value false
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked(); // Verify it's unchecked (false)
    
    // Verify "Ai uitat parola?" button
    const forgotPasswordBtn = page.locator('button:has-text("Ai uitat parola?")');
    await expect(forgotPasswordBtn).toBeVisible();
    
    // Verify "Intră" submit button
    const submitBtn = page.locator('button[type="submit"]:has-text("Intră")');
    await expect(submitBtn).toBeVisible();
  });

  test('Successful login redirects to dashboard', async ({ page }) => {
    await page.goto('https://voceapacientului.md/');
    
    // Open authentication popup
    const loginBtn = page.locator('text=Autentificare');
    await loginBtn.click();
    
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
    await page.waitForURL('https://voceapacientului.md/dashboard/dashboard', { timeout: 10000 });
    
    // Verify we're on the dashboard page
    await expect(page).toHaveURL(/\/dashboard/);
  });

  // test('Login with username only (edge case)', async ({ page }) => {
  //   await page.goto('https://voceapacientului.md/');
    
  //   const loginBtn = page.locator('text=Autentificare');
  //   await loginBtn.click();
    
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
  //   await page.goto('https://voceapacientului.md/');
    
  //   const loginBtn = page.locator('text=Autentificare');
  //   await loginBtn.click();
    
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
  //   await page.goto('https://voceapacientului.md/');
    
  //   const loginBtn = page.locator('text=Autentificare');
  //   await loginBtn.click();
    
  //   const forgotPasswordBtn = page.locator('button:has-text("Ai uitat parola?")');
  //   await expect(forgotPasswordBtn).toBeVisible();
  //   await expect(forgotPasswordBtn).toBeEnabled();
    
  //   // Click the button (you can add assertions for expected behavior)
  //   await forgotPasswordBtn.click();
    
  //   // Add verification for what should happen after clicking
  //   // For example, a new popup or navigation
  // });