import { Locator, Page } from '@playwright/test';

export class PlaywrightMainPage{
    readonly page: Page;
    readonly abTestingButton: Locator;
    readonly addRemoveButton: Locator;
    readonly checkboxesButton: Locator;
    readonly dropDownButton: Locator;
    readonly basicAuthButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.abTestingButton = page.locator('a', { hasText: 'A/B Testing' });
        this.addRemoveButton = page.locator('a', { hasText: 'Add/Remove Elements' });
        this.checkboxesButton = page.locator('a', { hasText: 'Checkboxes' });
        this.dropDownButton = page.locator('a', { hasText: 'Dropdown' });
        this.basicAuthButton = page.locator('a', { hasText: 'Basic Auth'}); 
        
    }
    async goto(){
        let myEnv = require( '../page/data/envs.json');
        let webURL =  myEnv.qa.webURL;
        if (process.env.runEnv == 'qa'){
            webURL =  myEnv.qa.webURL;
            console.log(`test ${webURL}`);
        } else if(process.env.runEnv == 'dev'){
            webURL =  myEnv.dev.webURL;
            console.log(`test ${webURL}`);
        } else{
            console.log(` ${process.env.runEnv}is an Invalid input`);
        }
        await this.page.goto(webURL);
    }
}