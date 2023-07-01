import { Locator, Page } from '@playwright/test';

export class PlaywrightCheckboxPage{
    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.locator('input').nth(0);
        this.checkbox2 = page.locator('input').nth(1);
        
    }
}