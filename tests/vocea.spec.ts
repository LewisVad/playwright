import { test, expect } from '@playwright/test';
import { MainPage } from './page/mainPage';

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.navigate();
});

test.describe.serial('Homepage tests', () => {
test('homepage loads', async ({ page }) => {
  await expect(page).toHaveTitle(/Vocea Pacientului/);
});

test('Login button exists', async ({ page }) => {
  const loginBtn = page.locator('text=Autentificare');
  await expect(loginBtn).toBeVisible();
});

test('Ro language option exists', async ({ page }) => {
  const roBtn = page.getByRole('button', { name: 'Ro', exact: true });
  await expect(roBtn).toBeVisible();
});

test('Ru language option exists',async ({ page }) => {
  const ruBtn = page.getByRole('button', { name: 'Ru', exact: true });
  await expect(ruBtn).toBeVisible();
});

test('First pharagraf exists',async ({ page }) => {
  await expect(page.getByText('Locul unde opinia ta face diferența')).toBeVisible();
});

test('Completeaza chestionarul button from first pharagraf exists',async ({ page }) => {
  const ccBtn = page.getByRole('button', { name: 'Completează chestionarul' }).first();
  await expect(ccBtn).toBeVisible({ timeout: 10000 });
});

test('Afla mai mult button exists',async ({ page }) => {
  const ammBtn = page.getByRole('button', { name: 'Află mai mult', exact: true });
  await expect(ammBtn).toBeVisible();
});

test('Second pharagraf exists',async ({ page }) => {
  await expect(page.getByText('Experiențe autentice, schimbări reale')).toBeVisible();
});

test('Completeaza chestionarul button from second pharagraf exists',async ({ page }) => {
  const ccBtn = page.getByRole('button', { name: 'Completează chestionarul' }).nth(1);
  await expect(ccBtn).toBeVisible({ timeout: 10000 });
});

test('Third pharagraf exists',async ({ page }) => {
  const title = page.getByText('Alătură-te comunității de pacienți responsabili și povestește despre experiența în instituțiile medicale')
                .first();

  await expect(title).toBeVisible();
});

test('Completeaza chestionarul button from second third exists',async ({ page }) => {
  const ccBtn = page.getByRole('button', { name: 'Completează chestionarul' }).nth(2);
await expect(ccBtn).toBeVisible({ timeout: 10000 });
});

test('Obiectivele noastre section exists',async ({ page }) => {
  await expect(page.getByText('Obiectivele noastre')).toBeVisible();
  await expect(page.getByText('Responsabilizarea instituțiilor medicale')).toBeVisible();
  await expect(page.getByText('Creșterea calității serviciilor medicale')).toBeVisible();
  await expect(page.getByText('Implicarea responsabilă a pacienților')).toBeVisible();
  await expect(page.getByText('Asigurarea transparenței sistemului de sănătate')).toBeVisible();
});

test('Drepturile unui pacient section exists',async ({ page }) => {
  await expect(page.getByText('Drepturile unui pacient')).toBeVisible();
});

test('Expand button exists',async ({ page }) => {
  const ammBtn = page.getByRole('button', { name: 'Citește toate', exact: true });
  await expect(ammBtn).toBeVisible();
});

test('Responsabilitățile unui pacient section exists',async ({ page }) => {
  await expect(page.getByText('Responsabilitățile unui pacient')).toBeVisible();
});

test('Fourth pharagraf exists',async ({ page }) => {
  const title = page.getByText('Alătură-te comunității de pacienți responsabili și povestește despre experiența în instituțiile medicale')
                .last();

  await expect(title).toBeVisible();
});

test('Completeaza chestionarul button from fourth exists',async ({ page }) => {
  const ccBtn = page.getByRole('button', { name: 'Completează chestionarul' }).nth(3);
  await expect(ccBtn).toBeVisible({ timeout: 10000 });
});

test('Link-uri utile section exists',async ({ page }) => {
  await expect(page.getByText('Link-uri utile')).toBeVisible();
});

test('Ministerul Sănătăţii al Republicii Moldova – text și link validate', async ({ page }) => {
  const usefulLinks = page.getByRole('link', { name: 'https://ms.gov.md/' });
  const href = await usefulLinks.getAttribute('href');

  await expect(page.getByText('Ministerul Sănătăţii al Republicii Moldova')).toBeVisible();
  await expect(usefulLinks).toBeVisible();
  await expect(usefulLinks).toHaveText('https://ms.gov.md/');
  await expect(usefulLinks).toHaveAttribute('href');
  expect(href).not.toBeNull();
  expect(href).not.toBe('');
});

test('Compania Naționala de Asigurări în Medicină – text și link validate', async ({ page }) => {
  const usefulLinks = page.getByRole('link', { name: 'http://cnam.md/' });
  const href = await usefulLinks.getAttribute('href');

  await expect(page.getByText('Compania Naționala de Asigurări în Medicină')).toBeVisible();
  await expect(usefulLinks).toBeVisible();
  await expect(usefulLinks).toHaveText('http://cnam.md/');
  await expect(usefulLinks).toHaveAttribute('href');
  expect(href).not.toBeNull();
  expect(href).not.toBe('');
});

test('Centrul Național Anticorupție – text și link validate', async ({ page }) => {
  const usefulLinks = page.getByRole('link', { name: 'https://www.cna.md/' });
  const href = await usefulLinks.getAttribute('href');

  await expect(page.getByText('Centrul Național Anticorupție')).toBeVisible();
  await expect(usefulLinks).toBeVisible();
  await expect(usefulLinks).toHaveText('https://www.cna.md/');
  await expect(usefulLinks).toHaveAttribute('href');
  expect(href).not.toBeNull();
  expect(href).not.toBe('');
});

test('Ești tratat bine – text și link validate', async ({ page }) => {
  const usefulLinks = page.getByRole('link', { name: 'https://tratatbine.md/' });
  const href = await usefulLinks.getAttribute('href');

  await expect(page.getByText('Ești tratat bine')).toBeVisible();
  await expect(usefulLinks).toBeVisible();
  await expect(usefulLinks).toHaveText('https://tratatbine.md/');
  await expect(usefulLinks).toHaveAttribute('href');
  expect(href).not.toBeNull();
  expect(href).not.toBe('');
});

test('Last section exists',async ({ page }) => {
  await expect(page.getByText('© 2024 Asociația Obștească CASMED. Toate drepturile sunt rezervate.')).toBeVisible();
})
});