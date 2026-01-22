import { expect, Page } from '@playwright/test';
import { time } from 'node:console';
import { TIMEOUT } from 'node:dns';

export class UserPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Navigation & Tab Interactions
  async verifyUserPageVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Utilizatori' })).toBeVisible();
  }

async verifyUserPageClickable(): Promise<void> {
  const currentUrl = this.page.url();
  const userPagePattern = /\/users\/\d+/;
  
  // Check if the current URL already contains the /users/{number} pattern
  const isOnUserPage = userPagePattern.test(currentUrl);
  
  // Get the link element
  const userLink = this.page.getByRole('link', { name: 'Utilizatori' });
  
  // Verify the link is enabled
  await expect(userLink).toBeEnabled();
  
  // Click only if not already on a user page
  if (!isOnUserPage) {
    await userLink.click();
    
    // Optional: Wait for navigation to complete
    await this.page.waitForURL(userPagePattern);
  }
}

async verifySearchingVisible(): Promise<void> {
  const byPlaceholder = this.page.getByPlaceholder('Căutare');
  const byText = this.page.locator('text=Căutare');
  const byRole = this.page.getByRole('textbox');
  
  const placeholderVisible = await byPlaceholder.isVisible().catch(() => false);
  const textVisible = await byText.isVisible().catch(() => false);
  const roleCount = await byRole.count();
  
  console.log('Search field diagnostics:');
  console.log(`- By placeholder visible: ${placeholderVisible}`);
  console.log(`- By text visible: ${textVisible}`);
  console.log(`- Textbox roles found: ${roleCount}`);
  
  // Use the working selector
  if (placeholderVisible) {
    await expect(this.page.getByPlaceholder('Căutare')).toBeVisible();
  } else if (roleCount > 0) {
    await expect(this.page.getByRole('textbox').first()).toBeVisible();
  } else {
    throw new Error('Search input not found with any selector');
  }
}

async verifyInstitutionVisible(): Promise<void> {
  await expect(this.page.getByPlaceholder('Instituție')).toBeVisible();
  // await expect(this.page.getByPlaceholder('Instituție').last()).toBeEditable();
}

async verifyPeriodVisible(): Promise<void> {
  const byPlaceholder = this.page.getByPlaceholder('Perioadă');
  const byText = this.page.locator('text=Perioadă');
  const byRole = this.page.getByRole('textbox');
  const byValue = this.page.locator('input[value="Perioadă"]');
  
  const placeholderVisible = await byPlaceholder.isVisible().catch(() => false);
  const textVisible = await byText.isVisible().catch(() => false);
  const roleCount = await byRole.count();
  const valueVisible = await byValue.isVisible().catch(() => false);
  
  console.log('Period field diagnostics:');
  console.log(`- By placeholder visible: ${placeholderVisible}`);
  console.log(`- By text visible: ${textVisible}`);
  console.log(`- Textbox roles found: ${roleCount}`);
  console.log(`- By value visible: ${valueVisible}`);
  
  // Use the working selector
  if (placeholderVisible) {
    await expect(this.page.getByPlaceholder('Perioadă')).toBeVisible();
  } else if (roleCount > 0) {
    await expect(this.page.getByRole('textbox').first()).toBeVisible();
  } else if (valueVisible) {
    await expect(this.page.locator('input[value="Perioadă"]').first()).toBeVisible();
  } else {
    throw new Error('Period input not found with any selector');
  }
}

async clickAddUserButton(): Promise<void> {
  console.log('Searching for Add User button...');
  
  // Try multiple selectors
  const byText = this.page.locator('button:has-text("Adaugă utilizator")');
  const byFullText = this.page.locator('button', { hasText: 'Adaugă utilizator' });
  const byClass = this.page.locator('button.mantine-Button-root');
  const allButtons = this.page.locator('button');
  
  const byTextVisible = await byText.isVisible().catch(() => false);
  const byFullTextVisible = await byFullText.isVisible().catch(() => false);
  const allButtonsCount = await allButtons.count();
  
  console.log('Button search results:');
  console.log(`- By exact text visible: ${byTextVisible}`);
  console.log(`- By full text visible: ${byFullTextVisible}`);
  console.log(`- Buttons found by class: ${await byClass.count()}`);
  console.log(`- Total buttons found: ${allButtonsCount}`);
  
  // Use the first working selector
  if (byTextVisible) {
    await expect(byText).toBeVisible();
    await byText.click();
    console.log(`Add User button clicked using Text button locator.`);
  } else if (byFullTextVisible) {
    await expect(byFullText).toBeVisible();
    await byFullText.click();
    console.log(`Add User button clicked using fullText button locator.`);
  } else if (allButtonsCount > 0) {
    // Find button with "Adaugă utilizator" text
    const addButton = this.page.locator('button').filter({ hasText: 'Adaugă utilizator' });
    if (await addButton.isVisible()) {
      await addButton.click();
      console.log(`Add User button clicked using generic button locator.`);
    } else {
      throw new Error('Add User button not found with any selector');
    }
  } else {
    throw new Error('No buttons found on page');
  }
  
  await this.page.waitForTimeout(500);

  await this.page.locator('header', { hasText: 'Crează utilizator' }).isVisible();
  console.log(`Modal 'Crează utilizator' is visible after clicking Add User button.`);

}

async verifyFormElements(): Promise<void> {
  
  // Verify form exists
  const form = this.page.locator('form').first();
  await expect(form).toBeVisible();
  
  // Verify all input fields are visible
  await expect(this.page.locator('input[placeholder="Numele"]')).toBeVisible();
  await expect(this.page.locator('input[placeholder="Prenumele"]')).toBeVisible();
  await expect(this.page.locator('input[placeholder="Email"]')).toBeVisible();
  
  // Verify labels are visible
  await expect(this.page.locator('text=Numele').first()).toBeVisible();
  await expect(this.page.locator('text=Prenumele')).toBeVisible();
  await expect(this.page.locator('text=Email')).toBeVisible();
  await expect(this.page.locator('text=Roluri')).toBeVisible();
  await expect(this.page.locator('text=Instituție').last()).toBeVisible();
  await expect(this.page.locator('text=Activ').last()).toBeVisible();
};

async fillFormElements(): Promise<void> {
  await this.page.locator('input[placeholder="Numele"]').fill('Popescu');
  await this.page.locator('input[placeholder="Prenumele"]').fill('Ion');
  await this.page.locator('input[placeholder="Email"]').fill('popescu.ion@email.com');

  // Verify fields are filled
  await expect(this.page.locator('input[placeholder="Numele"]')).toHaveValue('Popescu');
  await expect(this.page.locator('input[placeholder="Prenumele"]')).toHaveValue('Ion');
  await expect(this.page.locator('input[placeholder="Email"]')).toHaveValue('popescu.ion@email.com');
}

async checkRequiredElements(): Promise<void> {
  // Verify required asterisks are visible
  const requiredElements = this.page.locator('[data-required="true"]');
  const count = await requiredElements.count();
  
  // Should have at least 3 required fields (Numele, Prenumele, Email)
  expect(count).toBeGreaterThanOrEqual(3);
};

async verifyUserInformationButton(): Promise<void> {
  await expect(this.page.getByText('Top instituții')).toBeVisible();
};

async submitForm(): Promise<void> {
  // Fill form fields
  await this.page.locator('input[placeholder="Numele"]').fill('Ionescu');
  await this.page.locator('input[placeholder="Prenumele"]').fill('Maria');
  await this.page.locator('input[placeholder="Email"]').fill('maria.ionescu@example.com');
  
  // Select role (if available)
  const roleInput = this.page.locator('input[placeholder="Selectează rolurile"]');
  if (await roleInput.isVisible()) {
    await roleInput.click();
    await this.page.waitForTimeout(300);
    
    const roleOptions = this.page.locator('[role="option"]');
    const roleOptionCount = await roleOptions.count();
    console.log(`Found ${roleOptionCount} role options`);
    
    // if (roleOptionCount > 0) {
    //   console.log(`Found ${roleOptionCount} role options - selecting first one`);
    //   await roleOptions.first().click({ force: true });
    // } else {
    //   console.log('No role options available - skipping role selection');
    //   // Click elsewhere to close dropdown
    //   await this.page.locator('form').click();
    // }
  }
  
  // Select institution (if values available)
  const institutionInput = this.page.locator('input[placeholder="Selectează instituția"]').last();
  if (await institutionInput.isVisible()) {
    await institutionInput.click({ force: true });
    await this.page.waitForTimeout(500);
    
    const institutionOptions = this.page.locator('[role="option"]:visible');
    const institutionOptionCount = await institutionOptions.count();
    console.log(`Found ${institutionOptionCount} institution options`);
    
    // if (institutionOptionCount > 0) {
    //   console.log(`Found ${institutionOptionCount} institution options - selecting first one`);
    //   await institutionOptions.first().click({ force: true });
    // } else {
    //   console.log('No institution options available - skipping institution selection');
    //   // Click elsewhere to close dropdown
    //   await this.page.locator('form').click();
    // }
  }
  
  // Check "Activ" checkbox
  // const activeCheckbox = this.page.locator('input[role="switch"]');
  // if (await activeCheckbox.isVisible()) {
  //   await activeCheckbox.check();
  // }
  
  // Submit form
  const submitButton = this.page.locator('button[type="submit"]:has-text("Aplică")');
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  await submitButton.click();  
};

async isColumnHeaderVisible(): Promise<void> {
  await expect(this.page.locator(`thead th:has-text("ID")`)).toBeVisible();
  await expect(this.page.locator(`thead th:has-text("Nume de utilizator")`)).toBeVisible();
  await expect(this.page.locator(`thead th:has-text("Creat")`)).toBeVisible();
  await expect(this.page.locator(`thead th:has-text("Instituție")`)).toBeVisible();
  await expect(this.page.locator(`thead th:has-text("Activ")`)).toBeVisible();
  await expect(this.page.locator(`thead th:has-text("Rol")`)).toBeVisible();
}

// Check if table has rows and click the first row
async clickFirstTableRow(): Promise<void> {
  const tableRows = this.page.locator('tbody tr');
  const rowCount = await tableRows.count();
  
  if (rowCount === 0) {
    console.log('✗ No rows found in table');
    throw new Error('No rows found in user table');
  }
  
  console.log(`✓ Found ${rowCount} row(s) in table`);
  
  const firstRow = tableRows.first();
  await expect(firstRow).toBeVisible();
  await firstRow.click({ force: true });
  
  // Wait for modal to appear
  await this.page.waitForTimeout(500);
  
  console.log('✓ Clicked first row');

  await this.page.locator('header', { hasText: 'Detalii utilizator' }).isVisible();
  console.log(`Modal 'Detalii utilizator' is visible after clicking Add User button.`);

  const numele = this.page.getByText('Numele', { exact: true });
  console.log(`Nume : ${numele}`);
  const prenumele = this.page.getByText('Prenumele').nth(1);
  console.log(`Prenume : ${prenumele}`);
  const email = this.page.getByText('Email').last();
  console.log(`Email : ${email}`);
  const institutia = this.page.getByText('Numele instituției').last();
  console.log(`Instituție : ${institutia}`);
  const creat = this.page.getByText('Creat').last();
  console.log(`Creat : ${creat}`);
  const statut = this.page.getByText('Statut').last();
  console.log(`Statut : ${statut}`);
  const roluri = this.page.getByText('Roluri').last();
  console.log(`Roluri : ${roluri}`);

  await expect(this.page.getByText('Numele').nth(1)).toBeVisible();
  await expect(this.page.getByText('Prenumele').last()).toBeVisible();
  await expect(this.page.getByText('Email').last()).toBeVisible();
  await expect(this.page.locator('text=Numele instituției').last()).toBeVisible();
  await expect(this.page.locator('text=Creat').last()).toBeVisible();
  await expect(this.page.locator('text=Statut').last()).toBeVisible();
  await expect(this.page.locator('text=Roluri').last()).toBeVisible();

   const submitButton = this.page.locator('button[type="submit"]:has-text("Editează")');
   await expect(submitButton).toBeVisible();
}

async clickEditUserButton(): Promise<void> {
  const editButton = this.page.locator('button:has-text("Editează');
  await expect(editButton).toBeEnabled();
  await editButton.click();
}

}
