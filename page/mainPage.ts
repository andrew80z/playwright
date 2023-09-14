import { Locator, Page } from '@playwright/test';

export class PlaywrightMainPage{
    readonly page: Page;
    readonly abTestingButton: Locator;
    readonly addRemoveButton: Locator;
    readonly checkboxesButton: Locator;
    readonly dropDownButton: Locator;
    readonly basicAuthButton: Locator;
    readonly fileDownloadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.abTestingButton = page.locator('a', { hasText: 'A/B Testing' });
        this.addRemoveButton = page.locator('a', { hasText: 'Add/Remove Elements' });
        this.checkboxesButton = page.locator('a', { hasText: 'Checkboxes' });
        this.dropDownButton = page.locator('a', { hasText: 'Dropdown' });
        this.basicAuthButton = page.locator('a', { hasText: 'Basic Auth'}); 
        this.fileDownloadButton = page.getByText('File Download', { exact: true });
        
    }
    async goto(){
        let myEnv = require( '../page/data/envs.json');
        let webURL =  myEnv.qa.webURL;
        if (process.env.runEnv == 'qa'){
            webURL =  myEnv.qa.webURL;
        } else if(process.env.runEnv == 'dev'){
            webURL =  myEnv.dev.webURL;
        } else{ 
            console.log(` ${process.env.runEnv}is an Invalid input. Using default value`);
            webURL =  myEnv.qa.webURL;
        }
        await this.page.goto(webURL);
    }
}