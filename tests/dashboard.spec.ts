import { test, expect } from '@playwright/test';
import { DashboardPage } from './page/dashboard';
import { MainPage } from './page/mainPage'; 

let mainPage: MainPage;
let dashboardPage: DashboardPage;   

test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);  
    dashboardPage = new DashboardPage(page);
    await mainPage.navigate();

    // Perform login
    await mainPage.openAuthPopup();
    await mainPage.login('Admin', 'qwert12'); 
    // Ensure we're logged in by checking URL or some dashboard element
    await expect(page).toHaveURL(/\/dashboard/);
});

test.describe.serial('Dashboard tests', () => {
    test('Dashboard menu items exist and are clickable', async ({ page }) => {
        // Verify and click each menu item
        await expect(dashboardPage.usersMenu).toBeVisible();
        await dashboardPage.openUsers();    
        await expect(page).toHaveURL(/\/users\/.+$/);    
        await expect(dashboardPage.institutionMenu).toBeVisible();
        await dashboardPage.openInstitutions();    
        await expect(page).toHaveURL(/\/institutions\/.+$/); 
        await expect(dashboardPage.questionnarMenu).toBeVisible();      
        await dashboardPage.openQuestionnaires();
        await expect(page).toHaveURL(/\/questionnaires\/.+$/); 
        await expect(dashboardPage.contentMenu).toBeVisible();
        await dashboardPage.openContents();    
        await expect(page).toHaveURL(/\/content\/.+$/); 
        await expect(dashboardPage.reportMenu).toBeVisible();
        await dashboardPage.openReports();    
        await expect(page).toHaveURL(/\/reports\/.+$/); 
        await expect(dashboardPage.dashboardMenu).toBeVisible(); 
        await dashboardPage.openDashboard();    
        await expect(page).toHaveURL(/\/dashboard/);        
    });

    test('Nr. participanților la chestionar section exists',async ({ page }) => {
        await dashboardPage.participantsInTheQuestionnare();
    });

    test('Numărul pacienților nesatisfăcuți section exists',async ({ page }) => {
        await dashboardPage.dissatisfiedPatients();
    });

    test('Indiciile de informare a pacienților section exists',async ({ page }) => {
        await dashboardPage.indicatorsOfPatientInformation();
    });

    test('Gradul de satisfacție a pacientului cu privire la interacțiunea cu personalul medical section exists',async ({ page }) => {
        await dashboardPage.degreeOfPatientSatisfaction();
    });

    test('Gradul de încredere în instituție section exists',async ({ page }) => {
        await dashboardPage.degreeOfTrustInInstitution();
    });

    test('Indicatorii de satisfacție cu privire la facilitățile din instituția medicală section exists',async ({ page }) => {
        await dashboardPage.indicatorsOfSatisfactionWithFacilities();
    });

    test('Satisfacția pacienților section exists',async ({ page }) => {
        await dashboardPage.patientSatisfaction();
    });

    // test('Plăți neoficiale section exists',async ({ page }) => {
    //     await expect(page.getByText('Plăți neoficiale')).toBeVisible();
    //     await expect(page.getByText('Da')).toBeVisible();
    //     await expect(page.getByText('Nu')).toBeVisible();
    // });

    // test('Modalitatea de internare section exists',async ({ page }) => {
    //     await expect(page.getByText('Modalitatea de internare')).toBeVisible();
    // });

    // test('Secția în care au fost internați pacienții / Gradul de satisfacție section exists',async ({ page }) => {
    //     await expect(page.getByText('Secția în care au fost internați pacienții / Gradul de satisfacție')).toBeVisible();
    // });

    // test('Evoluția gradului de satisfacție pentru un an section exists',async ({ page }) => {
    //     await expect(page.getByText('Evoluția gradului de satisfacție pentru un an')).toBeVisible();
    // });
})