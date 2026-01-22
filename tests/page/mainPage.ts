import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly loginBtn: Locator;
    readonly authPopup: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly checkbox: Locator;
    readonly forgotPasswordBtn: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.locator('text=Autentificare');
        this.authPopup = page.locator('text=Autentificare').first();
        this.usernameField = page.locator('input[placeholder="Utilizator"]');
        this.passwordField = page.locator('input[placeholder="Parola"]');
        this.checkbox = page.locator('input[type="checkbox"]');
        this.forgotPasswordBtn = page.locator('button:has-text("Ai uitat parola?")');
        this.submitBtn = page.locator('button[type="submit"]:has-text("Intră")');
    }

    async navigate() {
        await this.page.goto('https://voceapacientului.md/');
    }

    async openAuthPopup() {
        await this.loginBtn.click();
    }   

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.submitBtn.click();
    }   

    async verifyAuthPopupElements() {
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        // await expect(this.checkbox).toBeVisible();
        // await expect(this.checkbox).not.toBeChecked();
        // await expect(this.forgotPasswordBtn).toBeVisible();
        await expect(this.submitBtn).toBeVisible();
    }
}