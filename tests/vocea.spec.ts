import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://voceapacientului.md/');
  await expect(page).toHaveTitle(/Vocea Pacientului/);
});

test('Login button exists and language', async ({ page }) => {
  await page.goto('https://voceapacientului.md/');

  // Folosim selector stabil
  const loginBtn = page.locator('text=Autentificare');
  const roBtn = page.getByRole('button', { name: 'Ru', exact: true });
  const ruBtn = page.getByRole('button', { name: 'Ro', exact: true });
  await expect(loginBtn).toBeVisible();
  await expect(roBtn).toBeVisible();
  await expect(ruBtn).toBeVisible();
});