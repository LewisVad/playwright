import { DashboardPage } from './page/dashboard';
import { MainPage } from './page/mainPage'; 
import { test, expect, chromium, FullConfig, Page } from '@playwright/test';

let mainPage: MainPage;
let dashboardPage: DashboardPage;   

test.beforeAll(async ({ browser }) => {
  // This runs ONCE before all tests in this file
  const context = await browser.newContext();
  const page = await context.newPage();
  
  mainPage = new MainPage(page);
  dashboardPage = new DashboardPage(page);
  
  // Login once
  await mainPage.navigate();
  await mainPage.openAuthPopup();
  await mainPage.login('Admin', 'qwert12');
  
  console.log('✓ Login completed - all tests will use dashboard page session');
});

test.describe.serial('Dashboard tests', () => {

    test('Dashboard tab is clickable', async ({ page }) => {
        await dashboardPage.clickTabZileAlt();
        await dashboardPage.clickTabTrimestru();
        await dashboardPage.clickTabAnual();
        await dashboardPage.clickTabDateRange();
        await dashboardPage.clickTabZileAlt();
    });

    test('Categoria institutiei section exists', async ({ page }) => {
        await dashboardPage.verifyCategoryInstitutionVisible();
    });

    test('Categoria institutiei contains options',async ({ page }) => {
        await dashboardPage.verifyCategoryInstitutionContainsOptions();
    });

    test('Instituția section exists',async ({ page }) => {
        await dashboardPage.verifyInstitutionVisible();
    }); 

    test('Grupa de vârstă section exists',async ({ page }) => {
        await dashboardPage.verifyAgeGroupVisible();
    });

    test('Nr. participanților la chestionar section exists',async ({ page }) => {
        await dashboardPage.verifyParticipantCountVisible();
    });

    test('Numărul pacienților nesatisfăcuți section exists',async ({ page }) => {
        await dashboardPage.verifyUnsatisfiedPatientsVisible();
    });

    test('Indiciile de informare a pacienților section exists',async ({ page }) => {
        await dashboardPage.verifyInformationIndicatorsVisible();
    });

    test('Gradul de satisfacție a pacientului cu privire la interacțiunea cu personalul medical section exists',async ({ page }) => {
        await dashboardPage.verifySatisfactionDegreeVisible();
    });

    test('Gradul de încredere în instituție section exists',async ({ page }) => {
        await dashboardPage.verifyConfidenceDegreeVisible();
    });

    test('Indicatorii de satisfacție cu privire la facilitățile din instituția medicală section exists',async ({ page }) => {
        await dashboardPage.verifySatisfactionIndicatorsVisible();
    });

    test('Satisfacția pacienților section exists',async ({ page }) => {
        await dashboardPage.verifyPatientSatisfactionVisible();
        await dashboardPage.verifyTotalParticipantsVisible();
        await dashboardPage.verifySatisfiedPatientsVisible();
        await dashboardPage.verifyPartialySatisfiedPatientsVisible();
        await dashboardPage.verifyDissatisfiedPatientsVisible();
    });

    test('Plăți neoficiale section exists',async ({ page }) => {
        await dashboardPage.verifyUnofficalPaymentsVisible();
        await dashboardPage.verifyTotalParticipantsSecondVisible();
        await dashboardPage.verifyYesVisible();
        await dashboardPage.verifyNoVisible();
    });

    test('Modalitatea de internare section exists',async ({ page }) => {
        await dashboardPage.verifyTotalParticipantsThirdVisible();
        await dashboardPage.verifyPlannedAdmissionVisible();
        await dashboardPage.verifyUrgentAdmissionVisible();
    });

    test('Ease of Appointment question exists',async ({ page }) => {
        await dashboardPage.verifyDepartmentVisible();
        await dashboardPage.verifyPediatricsVisible();
        await dashboardPage.verifyRecoveryVisible();
        await dashboardPage.verifyOtherVisible();
        await dashboardPage.verifyChirurgyVisible();
        await dashboardPage.verifyTraumatologyVisible();
        await dashboardPage.verifyCardioVisible();
        await dashboardPage.verifyGynecologyVisible();
        await dashboardPage.verifyMaternityVisible();
        await dashboardPage.verifyPregnancyPathologyVisible();
        await dashboardPage.verifyChronicDiseasesVisible();
        await dashboardPage.verifyInfectiousDiseasesVisible();
        await dashboardPage.verifyNeurologyVisible();
        await dashboardPage.verifyGeneralTherapyVisible();
    });

    test('Conditions Appreciation question exists',async ({ page }) => {
        await dashboardPage.verifySatisfactionEvolutionVisible();
        await dashboardPage.verifyJanuaryVisible();
        await dashboardPage.verifyFebruaryVisible();
        await dashboardPage.verifyMarchVisible();
        await dashboardPage.verifyAprilVisible();
        await dashboardPage.verifyMayVisible();
        await dashboardPage.verifyJuneVisible();
        await dashboardPage.verifyJulyVisible();
        await dashboardPage.verifyAugustVisible();
        await dashboardPage.verifySeptemberVisible();
        await dashboardPage.verifyOctoberVisible();
        await dashboardPage.verifyNovemberVisible();
        await dashboardPage.verifyDecemberVisible();
    });

    test('Additional expenses questions exist',async ({ page }) => {
        await dashboardPage.verifyAdditionalExpensesVisible();
    });

    test('Department Services questions exist',async ({ page }) => {
        await dashboardPage.verifyUnofficialPaymentsVisible();
    });

    test('Additional expenses question exists',async ({ page }) => {
        await dashboardPage.verifyAdditionalExpensesAMPVisible();
    });

    test('Unofficial payments AMP question exists',async ({ page }) => {
        await dashboardPage.verifyUnofficialPaymentsAMPVisible();
    });

    test('Hospital Facilities questions exist',async ({ page }) => {
        await dashboardPage.verifyPhysicalAccessVisible();  
        await dashboardPage.verifyWaitingAreaVisible();  
        await dashboardPage.verifySignageVisible();  
        await dashboardPage.verifyLodgingConditionsVisible();
        await dashboardPage.verifyHygieneConditionsVisible();  
        await dashboardPage.verifyFoodQualityVisible();  
    });

    test('Additional expenses AMP question exists',async ({ page }) => {
        await dashboardPage.verifyPhysicianServicesVisible();
        await dashboardPage.verifyNurseServicesVisible();
        await dashboardPage.verifyOtherServicesVisible();
    });

    test('Top Institutions & Sorting section exists',async ({ page }) => {
        await dashboardPage.verifyTopInstitutionsVisible();
        await dashboardPage.verifyInstitutionColumnHeaderVisible();
        await dashboardPage.verifyInformationButtonVisible();
        await dashboardPage.verifyStaffInteractionButtonVisible();
        await dashboardPage.verifyConfidenceDegreeButtonVisible();
    });
});

function beforeEach(arg0: ({ page }: { page: any; }) => Promise<void>, arg1: void) {
    throw new Error('Function not implemented.');
}