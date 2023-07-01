import {Locator, Page} from '@playwright/test';

export class PlaywrightAbPage {

    readonly page: Page;
    readonly abTestingContent: Locator;
    readonly abHeaderLabel: Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.abHeaderLabel = page.locator('h3');
        this.abTestingContent = page.locator('p');
    }
  }