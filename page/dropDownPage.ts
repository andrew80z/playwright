import { Locator, Page } from '@playwright/test';

export class PlaywrightDropDownPage{
    readonly page: Page;
    dropDownExpand: Locator;
    ddOption1: Locator;
    ddOption2: Locator;
    defaultOption: Locator;
    dropDownMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropDownMenu = page.locator('xpath=//select[@id="dropdown"]'); 
        this.dropDownExpand = page.locator('xpath=//select[@id="dropdown"]');
        this.defaultOption = page.locator('option', {hasText: 'Please select an option'});
        this.ddOption1 = page.locator('xpath=//option[@value="1"]');
        this.ddOption2 = page.locator('xpath=//option[@value="2"]');
    }
}