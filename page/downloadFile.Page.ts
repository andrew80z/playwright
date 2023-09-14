import { Locator, Page } from "@playwright/test";

import { test, expect } from '@playwright/test';


export class DownloadFilePage{
    page: Page;
    pdfDownloadButton: any;

    
    constructor(page: Page) {
        this.page = page;
        this.pdfDownloadButton = this.page.locator('a', {hasText : "Internet_April_1694613502959.pdf"});
    }
      
}
