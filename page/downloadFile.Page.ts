import { Locator, Page } from "@playwright/test";

import { test, expect } from '@playwright/test';


export class DownloadFilePage{
    page: Page;
    pdfDownloadButton: any;

    
    constructor(page: Page) {
        this.page = page;
        this.pdfDownloadButton = this.page.locator('[class="example"] a');
    }
      
}
