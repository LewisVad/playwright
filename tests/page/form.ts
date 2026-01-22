import { expect, Page } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToForm() {
    await this.page.goto('https://voceapacientului.md/');
  }

  async clickFirstButton() {
    const firstButton = this.page.getByRole('button', { name: 'Completează chestionarul' }).first();
    await firstButton.click();

    await this.page.goto('https://voceapacientului.md/questionnaire');
    console.log ('Navigated to form page:' + this.page.url());
  }

  async verifyFirstPageElements() {
  
    await expect(this.page.getByText('Stimate/ă respondent/ă,').first()).toBeVisible();
    await expect(this.page.getByText('Dacă ești aici, înseamnă că te preocupă calitatea serviciilor medicale pe care le primești.')).toBeVisible();
    await expect(this.page.getByText('Deci, te încurajăm să împărtășești experiența ta în instituțiile medicale de la noi din țară, fie ea pozitivă sau negativă, completând chestionarul de mai jos.')).toBeVisible();
    await expect(this.page.getByText('Opinia ta este foarte importantă, căci ajută instituțiile medicale să îți ofere servicii adaptate nevoilor tale și ale familiei tale.')).toBeVisible();
    await expect(this.page.getByText('Chestionarul este anonim, iar completarea acestuia îți va lua maximum 10 minute.')).toBeVisible();
    await expect(this.page.getByText('Vocea ta ca pacient contează!')).toBeVisible();

    await expect(this.page.getByText('Selectează limba')).toBeVisible();
    await expect(this.page.getByText('Aceasta poate fi schimbată')).toBeVisible();
    await expect(this.page.getByText('Română')).toBeVisible();
    await expect(this.page.getByText('Rusă')).toBeVisible();
    await expect(this.page.getByText('Selectează raionul')).toBeVisible();
    await expect(this.page.getByPlaceholder('Selectează raionul')).toBeVisible();
    await expect(this.page.getByText('Selectează instituția medicală')).toBeVisible();
    await expect(this.page.getByPlaceholder('Selectează instituția medicală')).toBeVisible();

    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeDisabled();
  }

  async submitFirstPageElements() {
    // Single selection matching the value or label
    await this.page.getByPlaceholder('Selectează raionul').click();
    await this.page.getByText('Chișinău').click();
    await this.page.getByPlaceholder('Selectează instituția medicală').click();
    await this.page.getByText('Institutul Mamei  şi Copilului').click();
    
    const button = this.page.getByRole('button', { name: 'Mai departe' });
  
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    
    // Click it
    await button.click();
    await expect(this.page.getByText('Chestionar de evaluare')).toBeVisible();
  }

  async verifySecondPageElements() {
  
    await expect(this.page.getByText('Chestionar de evaluare').first()).toBeVisible();
    await expect(this.page.getByText('a gradului de satisfacție a pacienților privind serviciile medicale acordate la nivel de spital')).toBeVisible();
    await expect(this.page.getByText('Stimate/ă respondent/ă,')).toBeVisible();
    await expect(this.page.getByText('În scopul îmbunătățirii calității și siguranței serviciilor acordate în Institutul Mamei şi Copilului, Vă rugăm să evaluați serviciile medicale de care ați beneficiat în cadrul instituției sus-menționate.')).toBeVisible();
    await expect(this.page.getByText('Completarea chestionarului va dura circa 5 minute. Răspunsurile Dvs. vor fi confidențiale.')).toBeVisible();
    await expect(this.page.getByText('Pentru început Vă rugăm să alegeți calificativul care descrie cel mai bine experiența Dumneavoastră în instituția medicală dată.')).toBeVisible();

    await expect(this.page.locator('button', { hasText: 'Satisfăcut/ă' }).first()).toBeEnabled();
    await expect(this.page.locator('button', { hasText: 'Parțial' }).first()).toBeEnabled();
    await expect(this.page.locator('button', { hasText: 'Nesatisfăcut/ă' }).last()).toBeEnabled();

    await expect(this.page.locator('button', { hasText: 'Înapoi' })).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeDisabled();
  }

  async submitSecondPageElements() {
    // Step 1: Wait for the button to be visible
    const button1 = this.page.locator('button').filter({ hasText: 'Nesatisfăcut/ă' }).first();
    const timeout = 10000; // 10 seconds
    await button1.waitFor({ state: 'visible', timeout });
    console.log(`✓ Button found and visible`);

    // Step 2: Get parent container to check for checked state
    const buttonContainer = button1.locator('..');
    
    // Step 3: Click the button
    await button1.click();
    console.log(`✓ Button clicked`);

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' });
  
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 1 din 8')).toBeVisible();
    console.log(`✓ Navigated to next page`);
  }
}