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
    console.log(`✓ Navigated to 1 page`);
  }

  async verifyThirdPageElements() {
    await expect(this.page.getByText('Pasul 1 din 8').first()).toBeVisible();
    await expect(this.page.getByText('Date generale').first()).toBeVisible();
    await expect(this.page.getByText('Vizita Dvs. a fost prima ca pacient(ă) în acest spital?').first()).toBeVisible();
    await expect(this.page.getByText('Nu').first()).toBeVisible();
    await expect(this.page.getByText('Da').first()).toBeVisible();
    await expect(this.page.getByText('Genul Dvs').first()).toBeVisible();
    await expect(this.page.getByText('Feminin')).toBeVisible(); 
    await expect(this.page.getByText('Masculin')).toBeVisible();
    await expect(this.page.getByText('Vârsta Dvs').first()).toBeVisible();
    await expect(this.page.getByPlaceholder('Selectează vârsta')).toBeVisible();
    await expect(this.page.getByText('Câte zile ați fost internat(ă) în spital?').first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: '1-6 zile' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: '7-14 zile' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Mai mult de 15 zile' }).first()).toBeVisible();
    await expect(this.page.getByText('Care a fost modalitatea de internare în spital?').first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Internare programată' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Internare urgentă' }).first()).toBeVisible();
    await expect(this.page.getByText('În care secție ați fost internat/ă?').first()).toBeVisible();
    await expect(this.page.getByPlaceholder('')).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitThirdPageElements() {
    // Select "Da" for first question
    await this.page.locator('input[type="radio"][value="0"]').check();
    // Select "Feminin" for gender
    await this.page.getByText('Feminin').click();
    // Select age from dropdown
    await this.page.getByPlaceholder('Selectează vârsta').click();
    await this.page.getByText('25').click();
    // Select "1-6 zile" for hospitalization duration
    await this.page.getByRole('radio', { name: '1-6 zile' }).first().click();
    // Select "Internare programată" for admission type
    await this.page.getByRole('radio', { name: 'Internare programată' }).first().click();
    try {
      const optionText = 'Neurologie';
      // Open dropdown
      const selectInput = this.page.locator('input[aria-haspopup="listbox"]').last();
      await selectInput.click();
      console.log('✓ Dropdown opened');
      
      await this.page.waitForTimeout(500);
      
      // Use regex for exact match to avoid partial matches
      const option = this.page.locator('[role="option"]').filter({ 
        hasText: new RegExp(`^${optionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) 
      }).first();
      
      // Scroll and click
      await option.scrollIntoViewIfNeeded();
      await expect(option).toBeVisible({ timeout: 10000 });
      await option.click();
      
      console.log(`✓ Successfully selected: "${optionText}"\n`);
      await this.page.waitForTimeout(400);
      
    } catch (error) {
      console.error(`✗ Error selecting option: ${error}`);
    } 

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' });
  
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 2 din 8')).toBeVisible();
    console.log(`✓ Navigated to 2 page`);
  }

  async verifyFourthPageElements() {
    // await this.generatePageElementsScript ();

    await expect(this.page.getByText('Pasul 2 din 8')).toBeVisible();
    await expect(this.page.getByText('Mulțumim pentru completare până la această etapă.')).toBeVisible();
    await expect(this.page.getByText('În același timp, în special dacă ați bifat Parțial satisfăcut/ă sau Nesatisfăcut/ă, rugăm să indicați la care din următoarele compartimente v-ați referit:')).toBeVisible();
    await expect(this.page.getByText('Prestarea/acordarea serviciilor medicale?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).first()).toBeVisible();
    await expect(this.page.getByText('Informare privind drepturile și responsabilitățile pacientului?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(1)).toBeVisible();
    await expect(this.page.getByText('Asigurarea medicală și plățile suplimentare în sănătate?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(2)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(2)).toBeVisible();
    await expect(this.page.getByText('Facilitățile/dotările din spital?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(3)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(3)).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitFourthPageElements() {
    // Select "Da" for first question
    await this.page.getByRole('radio', { name: 'Da' }).first().click();
    // Select "Nu" for second question
    await this.page.getByRole('radio', { name: 'Nu' }).nth(1).click();
    // Select "Da" for third question
    await this.page.getByRole('radio', { name: 'Da' }).nth(2).click();
    // Select "Nu" for fourth question
    await this.page.getByRole('radio', { name: 'Nu' }).nth(3).click();

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 3 din 8')).toBeVisible();
    console.log(`✓ Navigated to 3 page`);
  }

  async verifyFifthPageElements() {
    // await this.generatePageElementsScript();

    await expect(this.page.getByText('Pasul 3 din 8')).toBeVisible();
    await expect(this.page.getByText('Acordarea serviciilor medicale')).toBeVisible();
    await expect(this.page.getByText('Cunoașteți numele medicului Dvs. curant/care v-a tratat?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).first()).toBeVisible();
    await expect(this.page.getByText('Medicul v-a informat despre toate detaliile tratamentului și diagnosticului?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).first()).toBeVisible();
    await expect(this.page.getByText('Medicul v-a informat despre riscurile și consecințele tratamentului administrat, posibilele complicații?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(2)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(2)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(1)).toBeVisible();
    await expect(this.page.getByText('Medicii din spital au fost cooperanți și politicoși cu Dvs.?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(3)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(3)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(2)).toBeVisible();
    await expect(this.page.getByText('Asistenții medicali au fost cooperanți și politicoși cu Dvs.?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(4)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(4)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Testele și procedurile v-au fost explicate în detalii?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(5)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(5)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(4)).toBeVisible();
    await expect(this.page.getByText('Asistenții/tele medicali/e au realizat procedurile cu profesionalism?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(6)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(6)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(5)).toBeVisible();
    await expect(this.page.getByText('Asistenții/tele medicali/au răspuns rapid când au fost chemați?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(7)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(7)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Parțial' }).nth(6)).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitFifthPageElements() {
    // Select "Da" for first question
    await this.page.getByRole('radio', { name: 'Da' }).first().click(); 
    // Select "Da" for second question
    await this.page.getByRole('radio', { name: 'Da' }).nth(1).click();
    // Select "Da" for third question 
    await this.page.getByRole('radio', { name: 'Da' }).nth(2).click();
    // Select "Da" for fourth question
    await this.page.getByRole('radio', { name: 'Da' }).nth(3).click();    
    // Select "Da" for fifth question 
    await this.page.getByRole('radio', { name: 'Da' }).nth(4).click();
    // Select "Da" for sixth question
    await this.page.getByRole('radio', { name: 'Da' }).nth(5).click();
    // Select "Da" for seventh question
    await this.page.getByRole('radio', { name: 'Da' }).nth(6).click();
    // Select "Da" for eighth question
    await this.page.getByRole('radio', { name: 'Da' }).nth(7).click();
    // Wait for button to become enabled by polling
    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 4 din 8')).toBeVisible();
    console.log(`✓ Navigated to 4 page`);  
  }

  async verifySixthPageElements() {
    // await this.generatePageElementsScript ();

    await expect(this.page.getByText('Pasul 4 din 8')).toBeVisible();
    await expect(this.page.getByText('Informarea despre drepturile și responsabilitățile ca pacient')).toBeVisible();
    await expect(this.page.getByText('Ați fost informat/ă cu privire la drepturile Dvs?')).toBeVisible();
    await expect(this.page.getByText('Citește tot').first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).first()).toBeVisible();
    await expect(this.page.getByText('Ați fost informat/ă cu privire la responsabilitățile Dvs?')).toBeVisible();
    await expect(this.page.getByText('Citește tot').last()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(1)).toBeVisible();
    await expect(this.page.getByText('Despre care dintre următoarele instrumente propuse pentru colectarea opiniei Dvs., ați fost informat?')).toBeVisible();
    await expect(this.page.getByText('(bifați mai multe variante de răspuns)')).toBeVisible();
    await expect(this.page.getByText('Adresarea/plângerea directă la șeful secției sau la director')).toBeVisible();
    await expect(this.page.getByText('Registrul de reclamații')).toBeVisible();
    await expect(this.page.getByText('Cutia pentru sugestii')).toBeVisible();
    await expect(this.page.getByText('Petiții (scrisoare, cerere, sesizare)')).toBeVisible();
    await expect(this.page.getByText('Chestionarul de evaluare a gradului de satisfacție a pacientului')).toBeVisible();
    await expect(this.page.getByText('Nici unul')).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitSixthPageElements() {
    // Select "Da" for first question
    await this.page.getByRole('radio', { name: 'Da' }).first().click();
    // Select "Da" for second question
    await this.page.getByRole('radio', { name: 'Da' }).nth(1).click();
    // Select multiple options for third question
    await this.page.getByText('Adresarea/plângerea directă la șeful secției sau la director').click();
    await this.page.getByText('Chestionarul de evaluare a gradului de satisfacție a pacientului').click();

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 5 din 8')).toBeVisible();
    console.log(`✓ Navigated to 5 page`); 
  }

  async verifySeventhPageElements() {
    await expect(this.page.getByText('Pasul 5 din 8')).toBeVisible();
    await expect(this.page.getByText('Asigurarea medicală și plăți suplimentare')).toBeVisible();
    await expect(this.page.getByText('Sunteți persoană asigurată?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).first()).toBeVisible();
    await expect(this.page.getByText('Asigurarea medicală a acoperit toate cheltuielile aferente asistenței medicale pe care ați primit-o în spital?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(1)).toBeVisible();
    await expect(this.page.getByText('Ați efectuat plăți neoficiale pe durata spitalizării Dvs. în instituția noastră?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(2)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(2)).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitSeventhPageElements() {
    // Select "Da" for first question
    await this.page.getByRole('radio', { name: 'Da' }).first().click();
    // Select "Da" for second question  
    await this.page.getByRole('radio', { name: 'Da' }).nth(1).click();
    // Select "Nu" for third question
    await this.page.getByRole('radio', { name: 'Nu' }).nth(2).click();

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 6 din 8')).toBeVisible();
    console.log(`✓ Navigated to 6 page`); 
  }

  async verifyEighthPageElements() {
    // await this.generatePageElementsScript();

    await expect(this.page.getByText('Pasul 6 din 8')).toBeVisible();
    await expect(this.page.getByText('Facilitățile din spital')).toBeVisible();
    await expect(this.page.getByText('Evaluați cu un punctaj de la 1 la 5 (1-nesatisfăcător, 5 total satisfăcător) următoarele condiții din spital:')).toBeVisible();
    await expect(this.page.getByText('Accesul fizic în spital (indicatoare, rampe, balustrade, scări comode, bănci)')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').first()).toBeVisible();
    await expect(this.page.getByText('Spațiul destinat așteptării pentru pacienți')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').nth(1)).toBeVisible();
    await expect(this.page.getByText('Prezența indicatoarelor, panourilor informative pentru a vă orienta în spital/a găsi cabinetul/specialistul necesar')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').nth(2)).toBeVisible();
    await expect(this.page.getByText('Condițiile de cazare în spital (numărul de paturi în salon, accesul la baie, apă caldă etc)')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').nth(3)).toBeVisible();
    await expect(this.page.getByText('Condițiile de igienă în spital (în sala de proceduri, secție, salon, bloc sanitar etc.) pe durata aflării Dvs')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').nth(4)).toBeVisible();
    await expect(this.page.getByText('Calitatea alimentării în spital: cantitatea porțiilor de mâncare, frecvența alimentării, temperatura alimentelor, temperatura băuturilor, volumul băuturilor.')).toBeVisible();
    await expect(this.page.locator('.mantine-Rating-root').nth(5)).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitEighthPageElements() {
    // Rate all 6 rating components with 5 stars
    for (let i = 0; i < 6; i++) {
      const rating = this.page.locator('.mantine-Rating-root').nth(i);
      await rating.locator('svg').nth(4).click(); // Click the 5th star (index 4)
    }

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 7 din 8')).toBeVisible();
    console.log(`✓ Navigated to 7 page`); 
  }

  async verifyNinthPageElements() {
    await expect(this.page.getByText('Pasul 7 din 8')).toBeVisible();
    await expect(this.page.getByText('Încrederea pentru spital')).toBeVisible();
    await expect(this.page.getByText('Dacă ar fi necesar să vă adresați după servicii, ați opta/alege din nou pentru instituția dată?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).first()).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).first()).toBeVisible();
    await expect(this.page.getByText('Ați recomanda instituția noastră membrilor familiei, rudelor, prietenilor în caz de necesitate?')).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Nu' }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('radio', { name: 'Da' }).nth(1)).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Mai departe' }).last()).toBeVisible();
  }

  async submitNinthPageElements() {
    // Select "Da" for first question
    await this.page.getByRole('radio', { name: 'Da' }).first().click();
    // Select "Da" for second question  
    await this.page.getByRole('radio', { name: 'Da' }).nth(1).click();
    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Mai departe' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Pasul 8 din 8')).toBeVisible();
    console.log(`✓ Navigated to 8 page`); 
  }

  async verifyTenthPageElements() {
    await expect(this.page.getByText('Pasul 8 din 8')).toBeVisible();

    await expect(this.page.getByText('Sugestii').first()).toBeVisible();
    await expect(this.page.getByText('Ce sugestii și recomandări aveți pentru îmbunătățirea calității și siguranței serviciilor în instituția dată?')).toBeVisible();
    await expect(this.page.getByText('Completează')).toBeVisible();
    await expect(this.page.getByRole('textbox')).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Înapoi' }).last()).toBeVisible();
    await expect(this.page.locator('button', { hasText: 'Trimite răspuns' }).last()).toBeVisible();
  }

  async submitTenthPageElements() {
    // Fill the text area with a sample suggestion
    await this.page.getByRole('textbox').fill('Sugestii pentru îmbunătățirea calității serviciilor.');

    // Wait for button to become enabled by polling
    const button = this.page.getByRole('button', { name: 'Trimite răspuns' }).last();
    // Wait for it to be enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled({ timeout: 10000 });
    // Click it
    await button.click();
    await expect(this.page.getByText('Chestionarul a fost trimis cu succes!')).toBeVisible();
    await expect(this.page.getByText('Îți mulțumim pentru că ești un pacient responsabil și vrei să contribui la servicii de sănătate mai bune în regiunea ta!')).toBeVisible();
    console.log(`✓ Form submitted successfully`);
    // Wait for button to become enabled by polling
    const button1 = this.page.getByRole('button', { name: 'Pagina principală' }).last();
    // Wait for it to be enabled
    await button1.waitFor({ state: 'visible' });
    await expect(button1).toBeEnabled({ timeout: 10000 });
    // Click it
    await button1.click();
  }

  async generatePageElementsScript(): Promise<void> {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║     PLAYWRIGHT PAGE ELEMENTS VERIFICATION SCRIPT          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // Get all text elements
    await this.inspectTextElements();

    // Get all buttons
    await this.inspectButtons();

    // Get all input fields (text, email, password, etc.)
    await this.inspectInputFields();

    // Get all radio buttons
    await this.inspectRadioButtons();

    // Get all checkboxes
    await this.inspectCheckboxes();

    // Get all rating components (1-5 stars)
    await this.inspectRatingComponents();

    // Get all dropdown lists (select elements)
    await this.inspectDropdowns();

    // Get all links
    await this.inspectLinks();

    // Get all form elements
    await this.inspectFormElements();

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              SCRIPT GENERATION COMPLETE                   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  }

  private async inspectTextElements(): Promise<void> {
    console.log('📝 TEXT ELEMENTS:\n');
    
    const textElements = await this.page.locator('text=/\\S+/').all();
    const uniqueTexts = new Set<string>();

    for (const element of textElements) {
      try {
        const text = await element.textContent();
        if (text && text.trim().length > 0 && text.trim().length < 200) {
          const cleanText = text.trim().substring(0, 100);
          
          if (!uniqueTexts.has(cleanText)) {
            uniqueTexts.add(cleanText);
            const isVisible = await element.isVisible();
            
            console.log(`  await expect(this.page.getByText('${cleanText}${cleanText.length === 100 ? '...' : ''}')).toBeVisible();`);
        }
      }   } catch (error) {
        // Skip elements that fail
    }
  }
  }
  private async inspectButtons(): Promise<void> {
    console.log('\n🔘 BUTTONS:\n');
    
    const buttons = await this.page.locator('button, [role="button"]').all();

    for (const button of buttons) {
      try {
        const text = await button.textContent();
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();
        
        if (text && text.trim().length > 0) {
          const cleanText = text.trim();
          console.log(`  // Button: "${cleanText}"`);
          console.log(`  const ${this.createVariableName(cleanText)} = this.page.locator('button').filter({ hasText: '${cleanText}' });`);
          console.log(`  await expect(${this.createVariableName(cleanText)}).toBeVisible();`);
          console.log(`  await expect(${this.createVariableName(cleanText)}).${isEnabled ? 'toBeEnabled' : 'toBeDisabled'}();`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectInputFields(): Promise<void> {
    console.log('\n📥 INPUT FIELDS:\n');
    
    const inputs = await this.page.locator('input[type="text"], input[type="email"], input[type="password"], input[type="number"], textarea').all();

    for (const input of inputs) {
      try {
        const isVisible = await input.isVisible();
        const placeholder = await input.getAttribute('placeholder');
        const type = await input.getAttribute('type');
        const name = await input.getAttribute('name');
        const label = await this.getAssociatedLabel(input);

        const identifier = label || placeholder || name || `input-${type}`;
        
        if (isVisible) {
          console.log(`  // Input Field: ${identifier}`);
          console.log(`  const ${this.createVariableName(identifier)} = this.page.locator('input[name="${name}"]');`);
          console.log(`  await expect(${this.createVariableName(identifier)}).toBeVisible();`);
          console.log(`  // To fill: await ${this.createVariableName(identifier)}.fill('your_value_here');`);
          console.log(`  // To get value: const value = await ${this.createVariableName(identifier)}.inputValue();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectRadioButtons(): Promise<void> {
    console.log('\n⭕ RADIO BUTTONS:\n');
    
    const radios = await this.page.locator('input[type="radio"]').all();

    for (const radio of radios) {
      try {
        const isVisible = await radio.isVisible();
        const label = await this.getAssociatedLabel(radio);
        const value = await radio.getAttribute('value');
        const name = await radio.getAttribute('name');

        if (isVisible) {
          console.log(`  // Radio Button: ${label || value}`);
          console.log(`  const ${this.createVariableName(label || value)} = this.page.locator('input[type="radio"][value="${value}"]');`);
          console.log(`  await expect(${this.createVariableName(label || value)}).toBeVisible();`);
          console.log(`  // To select: await ${this.createVariableName(label || value)}.check();`);
          console.log(`  // To verify selected: await expect(${this.createVariableName(label || value)}).toBeChecked();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectCheckboxes(): Promise<void> {
    console.log('\n☑️ CHECKBOXES:\n');
    
    const checkboxes = await this.page.locator('input[type="checkbox"]').all();

    for (const checkbox of checkboxes) {
      try {
        const isVisible = await checkbox.isVisible();
        const label = await this.getAssociatedLabel(checkbox);
        const value = await checkbox.getAttribute('value');

        if (isVisible) {
          console.log(`  // Checkbox: ${label || value}`);
          console.log(`  const ${this.createVariableName(label || value)} = this.page.locator('input[type="checkbox"][value="${value}"]');`);
          console.log(`  await expect(${this.createVariableName(label || value)}).toBeVisible();`);
          console.log(`  // To check: await ${this.createVariableName(label || value)}.check();`);
          console.log(`  // To uncheck: await ${this.createVariableName(label || value)}.uncheck();`);
          console.log(`  // To verify checked: await expect(${this.createVariableName(label || value)}).toBeChecked();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectRatingComponents(): Promise<void> {
    console.log('\n⭐ RATING COMPONENTS (1-5 STARS):\n');
    
    const ratingRoots = await this.page.locator('.mantine-Rating-root').all();

    for (let ratingIndex = 0; ratingIndex < ratingRoots.length; ratingIndex++) {
      try {
        const ratingRoot = ratingRoots[ratingIndex];
        const isVisible = await ratingRoot.isVisible();
        
        if (isVisible) {
          const ratingId = await ratingRoot.getAttribute('id');
          const ratingInputs = await ratingRoot.locator('input[type="radio"].mantine-Rating-input').all();
          
          console.log(`  // Rating Component ${ratingIndex + 1}: ${ratingId || 'No ID'}`);
          const ratingVarName = `rating${ratingIndex + 1}`;
          
          console.log(`  const ${ratingVarName} = this.page.locator('.mantine-Rating-root${ratingId ? `#${ratingId}` : ''}');`);
          console.log(`  await expect(${ratingVarName}).toBeVisible();`);
          console.log(`\n  // Available star ratings (0-5 scale):\n`);
          
          // Inspect each star option (0-5)
          for (let starIndex = 0; starIndex < ratingInputs.length; starIndex++) {
            try {
              const input = ratingInputs[starIndex];
              const starValue = await input.getAttribute('value');
              const starLabel = await input.getAttribute('aria-label');
              const isChecked = await input.isChecked();
              
              const starVarName = `${ratingVarName}Star${starValue}`;
              const statusIndicator = isChecked ? ' ✓ (currently selected)' : '';
              
              console.log(`  //   ${starLabel || starValue} stars${statusIndicator}`);
              console.log(`  const ${starVarName} = ${ratingVarName}.locator('input[type="radio"][value="${starValue}"]');`);
              console.log(`  await expect(${starVarName}).toBeVisible();`);
              
            } catch (error) {
              // Skip individual star
            }
          }
          
          console.log(`\n  // USAGE EXAMPLES FOR RATING ${ratingIndex + 1}:`);
          console.log(`  // ========================================`);
          console.log(`\n  // To select a specific rating (e.g., 4 stars):`);
          console.log(`  await ${ratingVarName}.locator('input[type="radio"][value="4"]').check();`);
          console.log(`  await this.page.waitForTimeout(300); // Wait for animation`);
          console.log(`\n  // To verify a specific rating is selected:`);
          console.log(`  await expect(${ratingVarName}.locator('input[type="radio"][value="4"]')).toBeChecked();`);
          console.log(`\n  // To get the current rating value:`);
          console.log(`  const currentRating = await ${ratingVarName}.locator('input[type="radio"]:checked').getAttribute('value');`);
          console.log(`  console.log('Current rating:', currentRating);`);
          console.log(`\n  // To verify all rating options are visible:`);
          console.log(`  for (let i = 0; i <= 5; i++) {`);
          console.log(`    await expect(${ratingVarName}.locator(\`input[type="radio"][value="\${i}"]\`)).toBeVisible();`);
          console.log(`  }`);
          console.log(`\n  // To clear/reset rating (select 0):`);
          console.log(`  await ${ratingVarName}.locator('input[type="radio"][value="0"]').check();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectDropdowns(): Promise<void> {
    console.log('\n📋 DROPDOWN LISTS:\n');
    
    const selects = await this.page.locator('select').all();

    for (const select of selects) {
      try {
        const isVisible = await select.isVisible();
        const id = await select.getAttribute('id');
        const name = await select.getAttribute('name');
        const options = await select.locator('option').all();

        const identifier = id || name || 'dropdown';

        if (isVisible) {
          console.log(`  // Dropdown: ${identifier}`);
          console.log(`  const ${this.createVariableName(identifier)} = this.page.locator('select[name="${name}"]');`);
          console.log(`  await expect(${this.createVariableName(identifier)}).toBeVisible();`);
          console.log(`  // Options available:`);

          for (const option of options) {
            try {
              const optionText = await option.textContent();
              const optionValue = await option.getAttribute('value');
              console.log(`  //   - ${optionText?.trim() || optionValue}`);
            } catch (error) {
              // Skip
            }
          }

          console.log(`  // To select: await ${this.createVariableName(identifier)}.selectOption('value_here');`);
          console.log(`  // To get selected: const selected = await ${this.createVariableName(identifier)}.inputValue();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectLinks(): Promise<void> {
    console.log('\n🔗 LINKS:\n');
    
    const links = await this.page.locator('a').all();

    for (const link of links) {
      try {
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        const isVisible = await link.isVisible();

        if (text && text.trim().length > 0 && isVisible) {
          const cleanText = text.trim().substring(0, 50);
          console.log(`  // Link: "${cleanText}"`);
          console.log(`  const ${this.createVariableName(cleanText)} = this.page.getByRole('link', { name: '${cleanText}' });`);
          console.log(`  await expect(${this.createVariableName(cleanText)}).toBeVisible();`);
          console.log(`  // To click: await ${this.createVariableName(cleanText)}.click();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async inspectFormElements(): Promise<void> {
    console.log('\n📋 FORM ELEMENTS SUMMARY:\n');
    
    const forms = await this.page.locator('form').all();

    for (let i = 0; i < forms.length; i++) {
      try {
        const form = forms[i];
        const isVisible = await form.isVisible();
        const id = await form.getAttribute('id');

        if (isVisible) {
          console.log(`  // Form ${i + 1}: ${id || 'No ID'}`);
          console.log(`  const form${i + 1} = this.page.locator('form${id ? `#${id}` : ''}');`);
          console.log(`  await expect(form${i + 1}).toBeVisible();\n`);
        }
      } catch (error) {
        // Skip elements that fail
      }
    }
  }

  private async getAssociatedLabel(element: any): Promise<string> {
    try {
      const id = await element.getAttribute('id');
      if (id) {
        const label = await this.page.locator(`label[for="${id}"]`).first().textContent();
        if (label) return label.trim();
      }

      const parent = await element.locator('..').textContent();
      if (parent) {
        const cleanParent = parent.trim().substring(0, 50);
        return cleanParent;
      }
    } catch (error) {
      // Return empty string
    }
    return '';
  }

  private createVariableName(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '')
      .substring(0, 30);
  }

  // Helper method to verify all elements at once
  async verifyAllPageElements(): Promise<void> {
    console.log('\n✅ VERIFYING ALL PAGE ELEMENTS...\n');

    const elements = await this.page.locator('*').all();
    let visibleCount = 0;

    for (const element of elements) {
      try {
        if (await element.isVisible()) {
          visibleCount++;
        }
      } catch (error) {
        // Skip
      }
    }

    console.log(`📊 Total visible elements: ${visibleCount}`);
  }

  // Helper method to generate filled form script
  async generateFilledFormScript(formData: Record<string, string>): Promise<void> {
    console.log('\n📝 FILLED FORM SCRIPT:\n');

    console.log('async fillFormWithData() {');
    
    for (const [fieldName, value] of Object.entries(formData)) {
      console.log(`  // Fill: ${fieldName}`);
      console.log(`  await this.page.locator('[name="${fieldName}"]').fill('${value}');`);
    }

    console.log('}');
  }

}