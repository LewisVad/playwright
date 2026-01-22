import { expect, Page } from '@playwright/test';
import { networkInterfaces } from 'os';

export class DashboardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Navigation & Tab Interactions
  async verifyDashboardMainVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  }

  // async clickTabZile(): Promise<void> {
  //   await this.page.getByRole('tab', { name: '30 zile' }).click();
  // }

  
  // Solution 2: Try multiple selectors (case-insensitive and partial match)
  async clickTabZileAlt(): Promise<void> {
    const selectors = [
      () => this.page.getByRole('tab', { name: '30 zile' }), // Case-insensitive
      () => this.page.getByRole('tab', { name: '30 Zile' }), // Capitalized
      () => this.page.locator('[role="tab"]', { has: this.page.locator('text=30 zile') }),
      () => this.page.locator('button', { has: this.page.locator('text=30 zile') }),
    ];

    for (const selector of selectors) {
      try {
        const element = selector();
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.click();
        return;
      } catch (e) {
        continue;
      }
    }
    
    throw new Error('Tab "30 zile" not found with any selector');
  }

  async clickTabTrimestru(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Trimestru' }).click();
  }

  async clickTabAnual(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Anual' }).click();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Click tab with date range (today and 30 days ago)
   */
  async clickTabDateRange(): Promise<void> {
    // Get today's date
    const endDate = new Date();
    
    // Get date 30 days ago
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 29);
    
    // Format dates as YYYY-MM-DD
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);
    
    const dateRange = `${formattedStartDate} | ${formattedEndDate}`;
    
    console.log(`Looking for tab with date range: ${dateRange}`);
    
    // Use text filter instead of name
    const tabButton = this.page.getByRole('tab').filter({
      hasText: dateRange
    });
    
    await tabButton.waitFor({ state: 'visible', timeout: 10000 });
    await tabButton.click();
  }

  // Category & Institution Filter Fields
  async verifyCategoryInstitutionVisible(): Promise<void> {
    await expect(this.page.getByPlaceholder('Categoria Instituției')).toBeVisible();
  }

  async verifyCategoryInstitutionContainsOptions(): Promise<void> {
    const field = this.page.getByPlaceholder('Categoria Instituției');
    
    // Click to open dropdown
    await field.click();
    
    // Wait for dropdown to appear
    await this.page.waitForSelector('[role="listbox"], [role="option"]', { 
      timeout: 10000 
    });
    
    // Define the options to verify
    const requiredOptions = [
      'Asistență Medicală Specializată de Ambulator (AMSA)',
      'Instituție de Asistență Medicală Primară (AMP)',
      'Spital'
    ];
    
    // Check each option exists
    for (const option of requiredOptions) {
      const optionElement = this.page.locator('[role="option"]').filter({
        hasText: option
      });
      
      await expect(optionElement).toBeVisible({
        timeout: 10000
      });
    }
  }

  async verifyInstitutionVisible(): Promise<void> {
    await expect(this.page.getByPlaceholder('Instituție').last()).toBeEditable();
  }

  async verifyAgeGroupVisible(): Promise<void> {
    await expect(this.page.getByPlaceholder('Grupa de vârstă')).toBeVisible();
  }

  // Participation & Satisfaction Metrics
  async verifyParticipantCountVisible(): Promise<void> {
    await expect(this.page.getByText('Nr. participanților la chestionar').nth(1)).toBeVisible();
  }

  async verifyUnsatisfiedPatientsVisible(): Promise<void> {
    await expect(this.page.getByText('Numărul pacienților nesatisfăcuți').nth(1)).toBeVisible();
  }

  async verifyInformationIndicatorsVisible(): Promise<void> {
    await expect(this.page.getByText('Indiciile de informare a pacienților').nth(1)).toBeVisible();
  }

  async verifySatisfactionDegreeVisible(): Promise<void> {
    await expect(this.page.getByText('Gradul de satisfacție a pacientului cu privire la interacțiunea cu personalul medical').nth(1)).toBeVisible();
  }

  async verifyConfidenceDegreeVisible(): Promise<void> {
    await expect(this.page.getByText('Gradul de încredere în instituție').nth(1)).toBeVisible();
  }

  async verifySatisfactionIndicatorsVisible(): Promise<void> {
    await expect(this.page.getByText('Indicatorii de satisfacție cu privire la facilitățile din instituția medicală').nth(1)).toBeVisible();
  }

  async verifyPatientSatisfactionVisible(): Promise<void> {
    await expect(this.page.getByText('Satisfacția pacienților').nth(1)).toBeVisible();
  }

  async verifyTotalParticipantsVisible(): Promise<void> {
    await expect(this.page.getByText('Total participanți').first()).toBeVisible();
  }

  // Patient Satisfaction Status
  async verifySatisfiedPatientsVisible(): Promise<void> {
    await expect(this.page.getByText('Nr. de pacienți satisfăcuți')).toBeVisible();
  }

  async verifyPartialySatisfiedPatientsVisible(): Promise<void> {
    await expect(this.page.getByText('Nr. de pacienți parțial')).toBeVisible();
  }

  async verifyDissatisfiedPatientsVisible(): Promise<void> {
    await expect(this.page.getByText('Nr. de pacienți nesatisfăcuți')).toBeVisible();
  }

  async verifyUnofficalPaymentsVisible(): Promise<void> {
    await expect(this.page.getByText('Plăți neoficiale').nth(4)).toBeVisible();
  }

  async verifyTotalParticipantsSecondVisible(): Promise<void> {
    await expect(this.page.getByText('Total participanți').nth(1)).toBeVisible();
  }

  // Boolean Answers
  async verifyYesVisible(): Promise<void> {
    await expect(this.page.getByText('Da', { exact: true })).toBeVisible();
  }

  async verifyNoVisible(): Promise<void> {
    await expect(this.page.getByText('Nu', { exact: true })).toBeVisible();
  }
  // Admission & Participant Types
  async verifyAdmissionModeVisible(): Promise<void> {
    await expect(this.page.getByText('Modalitatea de internare').nth(1)).toBeVisible();
  }

  async verifyTotalParticipantsThirdVisible(): Promise<void> {
    await expect(this.page.getByText('Total participanți').nth(2)).toBeVisible();
  }  

  // Admission Type Selection
  async verifyPlannedAdmissionVisible(): Promise<void> {
    await expect(this.page.getByText('Internare programată')).toBeVisible();
  }

  async verifyUrgentAdmissionVisible(): Promise<void> {
    await expect(this.page.getByText('Internare urgentă')).toBeVisible();
  }

  // Department Selection
  async verifyDepartmentVisible(): Promise<void> {
    await expect(this.page.getByText('Secția în care au fost internați pacienții / Gradul de satisfacție').nth(1)).toBeVisible();
  }

  async verifyPediatricsVisible(): Promise<void> {
    await expect(this.page.getByText('Pediatrie').nth(1)).toBeVisible();
  }

  async verifyRecoveryVisible(): Promise<void> {
    await expect(this.page.getByText('Recuperare / Reabilitare').nth(1)).toBeVisible();
  }

  async verifyOtherVisible(): Promise<void> {
    await expect(this.page.getByText('Altele, specificați').nth(1)).toBeVisible();
  }

  async verifyChirurgyVisible(): Promise<void> {
    await expect(this.page.getByText('Chirurgie').nth(2)).toBeVisible();
  }

  async verifyTraumatologyVisible(): Promise<void> {
    await expect(this.page.getByText('Traumatologie').nth(2)).toBeVisible();
  }

  async verifyCardioVisible(): Promise<void> {
    await expect(this.page.getByText('Cardiologie').nth(1)).toBeVisible();
  }

  async verifyGynecologyVisible(): Promise<void> {
    await expect(this.page.getByText('Ginicologie').nth(1)).toBeVisible();
  }

  async verifyMaternityVisible(): Promise<void> {
    await expect(this.page.getByText('Maternitate').nth(1)).toBeVisible();
  }

  async verifyPregnancyPathologyVisible(): Promise<void> {
    await expect(this.page.getByText('Patologia gravidității').nth(1)).toBeVisible();
  }

  async verifyChronicDiseasesVisible(): Promise<void> {
    await expect(this.page.getByText('Boli cronice').nth(1)).toBeVisible();
  }

  async verifyInfectiousDiseasesVisible(): Promise<void> {
    await expect(this.page.getByText('Boli infecțioase').nth(1)).toBeVisible();
  }

  async verifyNeurologyVisible(): Promise<void> {
    await expect(this.page.getByText('Neurologie').nth(1)).toBeVisible();
  }

  async verifyGeneralTherapyVisible(): Promise<void> {
    await expect(this.page.getByText('Terapie generală').nth(1)).toBeVisible();
  }

  // Satisfaction Evolution
  async verifySatisfactionEvolutionVisible(): Promise<void> {
    await expect(this.page.getByText('Evoluția gradului de satisfac').nth(1)).toBeVisible();
  }

  // Month Selection
  async verifyJanuaryVisible(): Promise<void> {
    await expect(this.page.getByText('ianuarie').nth(1)).toBeVisible();
  }

  async verifyFebruaryVisible(): Promise<void> {
    await expect(this.page.getByText('februarie').nth(1)).toBeVisible();
  }

  async verifyMarchVisible(): Promise<void> {
    await expect(this.page.getByText('martie').nth(1)).toBeVisible();
  }

  async verifyAprilVisible(): Promise<void> {
    await expect(this.page.getByText('aprilie').nth(1)).toBeVisible();
  }

  async verifyMayVisible(): Promise<void> {
    await expect(this.page.getByText('mai').nth(1)).toBeVisible();
  }

  async verifyJuneVisible(): Promise<void> {
    await expect(this.page.getByText('iunie').nth(1)).toBeVisible();
  }

  async verifyJulyVisible(): Promise<void> {
    await expect(this.page.getByText('iulie').nth(1)).toBeVisible();
  }

  async verifyAugustVisible(): Promise<void> {
    await expect(this.page.getByText('august').nth(1)).toBeVisible();
  }

  async verifySeptemberVisible(): Promise<void> {
    await expect(this.page.getByText('septembrie').nth(1)).toBeVisible();
  }

  async verifyOctoberVisible(): Promise<void> {
    await expect(this.page.getByText('octombrie').nth(1)).toBeVisible();
  }

  async verifyNovemberVisible(): Promise<void> {
    await expect(this.page.getByText('noiembrie').nth(1)).toBeVisible();
  }

  async verifyDecemberVisible(): Promise<void> {
    await expect(this.page.getByText('decembrie').nth(1)).toBeVisible();
  }

  // Additional Expenses & Payments
  async verifyAdditionalExpensesVisible(): Promise<void> {
    await expect(this.page.getByText('Cheltuieli suplimentare').nth(2)).toBeVisible();
  }

  async verifyUnofficialPaymentsVisible(): Promise<void> {
    await expect(this.page.getByText('Plăți neoficiale').nth(5)).toBeVisible();
  }

  async verifyPhysicianServicesVisible(): Promise<void> {
    await expect(this.page.getByText('Serviciile medicului').nth(3)).toBeVisible();
  }

  async verifyNurseServicesVisible(): Promise<void> {
    await expect(this.page.getByText('Serviciile asistentei medicale').nth(3)).toBeVisible();
  }

  async verifyOtherServicesVisible(): Promise<void> {
    await expect(this.page.getByText('Altele specificați').nth(3)).toBeVisible();
  }

  async verifyAdditionalExpensesAMPVisible(): Promise<void> {
    await expect(this.page.getByText('Cheltuieli suplimentare în AMP').nth(1)).toBeVisible();
  }

  async verifyUnofficialPaymentsAMPVisible(): Promise<void> {
    await expect(this.page.getByText('Plăți neoficiale în AMP').nth(1)).toBeVisible();
  }

  // Hospital & AMP Facilities
  async verifyHospitalFacilitiesVisible(): Promise<void> {
    await expect(this.page.getByText('Facilitățile din spital').nth(2)).toBeVisible();
  }

  // Accessibility & Conditions
  async verifyPhysicalAccessVisible(): Promise<void> {
    await expect(this.page.getByText('h1').nth(5)).toBeVisible();
    await expect(this.page.getByText('Accesul fizic în spital (indicatoare, rampe, balustrade, scări comode, bănci)').nth(1)).toBeVisible();
  }

  async verifyWaitingAreaVisible(): Promise<void> {
    await expect(this.page.getByText('h2').nth(5)).toBeVisible();
    await expect(this.page.getByText('Spațiul destinat așteptării pentru pacienți').nth(1)).toBeVisible();
  }

  async verifySignageVisible(): Promise<void> {
    await expect(this.page.getByText('h3').nth(5)).toBeVisible();
    await expect(this.page.getByText('Prezența indicatoarelor, panourilor informative pentru a vă orienta în spital/a găsi cabinetul/specialistul necesar').nth(1)).toBeVisible();
  }

  async verifyLodgingConditionsVisible(): Promise<void> {
    await expect(this.page.getByText('h4').nth(5)).toBeVisible();
    await expect(this.page.getByText('Condițiile de cazare în spital (numărul de paturi în salon, accesul la baie, apă caldă etc)').nth(1)).toBeVisible();
  }

  async verifyHygieneConditionsVisible(): Promise<void> {
    await expect(this.page.getByText('h5').nth(5)).toBeVisible();
    await expect(this.page.getByText('Condițiile de igienă în spital (în sala de proceduri, secție, salon, bloc sanitar etc.) pe durata aflării Dvs').nth(1)).toBeVisible();
  }

  async verifyFoodQualityVisible(): Promise<void> {
    await expect(this.page.getByText('h6').nth(5)).toBeVisible();
    await expect(this.page.getByText('Calitatea alimentării în spital: cantitatea porțiilor de mâncare, frecvența alimentării, temperatura alimentelor, temperatura băuturilor, volumul băuturilor').nth(1)).toBeVisible();
  }

  async verifyAMPFacilitiesVisible(): Promise<void> {
    await expect(this.page.getByText('Facilitățile din AMP').nth(1)).toBeVisible();
  }

  async verifyInstitutionAccessVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h1' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Accesul în instituție (indicatoare, rampe, balustrade, scări comode, bănci)').nth(1)).toBeVisible();
  }

  async verifyWaitingAreaThirdVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h2' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Spațiul destinat așteptării pentru pacienți').nth(3)).toBeVisible();
  }

  async verifyEaseOfAppointmentVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h3' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Cât de ușor v-a fost să vă orientați de sine stătător în instituție și să găsiți medicul/cabinetul necesar (indicatoare, panouri informative etc.)?').nth(1)).toBeVisible();
  }

  async verifyConditionsAppreciationVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h4' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Cum apreciați condițiile de igienă în instituția noastră (în sala de proceduri, cabinetul medicului de familie, sala de triaj, staționarul de zi, blocul sanitar etc.).').nth(1)).toBeVisible();
  }

  // Department Services
  async verifyDayStationeryVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h5' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Staționarul de zi').nth(3)).toBeVisible();
  }

  async verifyTriageRoomVisible(): Promise<void> {
    await expect(this.page.locator('span').filter({ hasText: 'h6' }).nth(3)).toBeVisible();
    await expect(this.page.getByText('Sala de triaj').nth(3)).toBeVisible();
  }

  async verifyProceduresCabinetVisible(): Promise<void> {
    await expect(this.page.getByText('h7').nth(3)).toBeVisible();
    await expect(this.page.getByText('Cabinetul de proceduri').nth(1)).toBeVisible();
  }

  async verifyImagingCabinetVisible(): Promise<void> {
    await expect(this.page.getByText('h8').nth(3)).toBeVisible();
    await expect(this.page.getByText('Cabinetul de imagistică (roentgen)/USG (după caz)').nth(1)).toBeVisible();
  }

  async verifyRehabilitationServiceVisible(): Promise<void> {
    await expect(this.page.getByText('h9').nth(3)).toBeVisible();
    await expect(this.page.getByText('Serviciul de reabilitare medicală și medicină fizică (cabinet de fizioterapie)').nth(1)).toBeVisible();
  }

  // Top Institutions & Sorting
  async verifyTopInstitutionsVisible(): Promise<void> {
    await expect(this.page.getByText('Top instituții').nth(1)).toBeVisible();
  }

  async verifyInstitutionColumnHeaderVisible(): Promise<void> {
    await expect(this.page.getByRole('columnheader', { name: 'INSTITUȚIA' }).nth(1)).toBeVisible();
  }

  // Report Buttons
  async verifyInformationButtonVisible(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'INFORMARE' }).nth(1)).toBeVisible();
  }

  async verifyStaffInteractionButtonVisible(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'INTERACȚIUNEA CU PERSONALUL' }).nth(1)).toBeVisible();
  }

  async verifyConfidenceDegreeButtonVisible(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'GRADUL DE ÎNCREDERE' }).nth(1)).toBeVisible();
  }
}