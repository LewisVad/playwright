import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardMenu: Locator;
    readonly usersMenu: Locator;
    readonly institutionMenu: Locator;
    readonly questionnarMenu: Locator;
    readonly contentMenu: Locator;
    readonly reportMenu: Locator;
    // readonly participantsInTheQuestionnare: Locator;
        

    constructor(page: Page) {
        this.page = page;
        this.dashboardMenu = page.locator('text=Dashboard').first();
        this.usersMenu = page.locator('text=Utilizatori').first();
        this.institutionMenu = page.locator('text=Instituții').first();
        this.questionnarMenu = page.locator('text=Chestionare').first();;
        this.contentMenu = page.locator('text=Conținut').first();
        this.reportMenu = page.locator('text=Rapoarte').first();
        // this.participantsInTheQuestionnare = page.locator('text=Nr. participanților la chestionar').first();
    }

    async openDashboard() {
        await this.dashboardMenu.click();
    }   

    async openUsers() {
        await this.usersMenu.click();
    }

    async openInstitutions() {
        await this.institutionMenu.click();
    }

    async openQuestionnaires() {
        await this.questionnarMenu.click();
    }

    async openContents() {
        await this.contentMenu.click();
    }

    async openReports() {
        await this.reportMenu.click();
    }

    async participantsInTheQuestionnare() {
        const participantsInTheQuestionnare = this.page.locator('text=Nr. participanților la chestionar').first();
        await expect(participantsInTheQuestionnare).toBeVisible();
    }

    async dissatisfiedPatients() {
        const dissatisfiedPatients = this.page.locator('text=Numărul pacienților nesatisfăcuți').nth(1);
        await expect(dissatisfiedPatients).toBeVisible();
    }

    async indicatorsOfPatientInformation() {
        const indicatorsOfPatientInformation = this.page.locator('text=Indiciile de informare a pacienților').first();
        await expect(indicatorsOfPatientInformation).toBeVisible();
    }

    async degreeOfPatientSatisfaction() {
        const degreeOfPatientSatisfaction = this.page.locator('text=Gradul de satisfacție a pacientului cu privire la interacțiunea cu personalul medical').first();
        await expect(degreeOfPatientSatisfaction).toBeVisible();
    }

    async degreeOfTrustInInstitution() {
        const degreeOfTrustInInstitution = this.page.locator('text=Gradul de încredere în instituție').first();
        await expect(degreeOfTrustInInstitution).toBeVisible();
    }

    async indicatorsOfSatisfactionWithFacilities() {
        const indicatorsOfSatisfactionWithFacilities = this.page.locator('text=Indicatorii de satisfacție cu privire la facilitățile din instituția medicală').first();
        await expect(indicatorsOfSatisfactionWithFacilities).toBeVisible();
    }

    async patientSatisfaction() {
        const patientSatisfaction = this.page.locator('text=Satisfacția pacienților').first();
        await expect(patientSatisfaction).toBeVisible();
        const satisfiedPatients = this.page.locator('text=Nr. de pacienți satisfăcuți:').first();
        await expect(satisfiedPatients).toBeVisible();
        const partiallyDissatisfiedPatients = this.page.locator('text=Nr. de pacienți parțial nesatisfăcuți:').first();
        await expect(partiallyDissatisfiedPatients).toBeVisible();
        const dissatisfiedPatients = this.page.locator('text=Nr. de pacienți nesatisfăcuți:').first();
        await expect(dissatisfiedPatients).toBeVisible();
    }
}