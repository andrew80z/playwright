import { test as base, expect } from '@playwright/test';
import { PlaywrightMainPage } from '../page/mainPage';
import { PlaywrightAbPage } from '../page/abPage';
import { PlaywrightAddRemoveElPage } from '../page/addRemove-elements-page';
import { PlaywrightCheckboxPage } from '../page/checkboxesPage';
import { PlaywrightDropDownPage } from '../page/dropDownPage';
import { DownloadFilePage } from '../page/downloadFile.Page';

// Extend the base test with fixtures
const test = base.extend<{
    mainPage: PlaywrightMainPage;
    playwrightAb: PlaywrightAbPage;
    addRemoveEl: PlaywrightAddRemoveElPage;
    checkboxesPage: PlaywrightCheckboxPage;
    dropDownPage: PlaywrightDropDownPage;
    downloadFilePage: DownloadFilePage;
    screenshotName: string;
}>({
    mainPage: async ({ page }, use) => {
        const mainPage = new PlaywrightMainPage(page);
        await mainPage.goto();
        await use(mainPage);
    },
    playwrightAb: async ({ page }, use) => {
        const playwrightAb = new PlaywrightAbPage(page);
        await use(playwrightAb);
    },

    addRemoveEl: async ({ page }, use) => {
        const addRemoveEl = new PlaywrightAddRemoveElPage(page);
        await use(addRemoveEl);
    },

    checkboxesPage: async ({ page }, use) => {
        const checkboxesPage = new PlaywrightCheckboxPage(page);
        await use(checkboxesPage);
    },
    dropDownPage: async ({ page }, use) => {
        const dropDownPage = new PlaywrightDropDownPage(page);
        await use(dropDownPage);
    },
    downloadFilePage: async ({ page }, use) => {
        const downloadFilePage = new DownloadFilePage(page);
        await use(downloadFilePage);
    },
    screenshotName: async ({ }, use, testInfo) => {
        const nowDate = new Date();
        const screenshotName =
            '.test-results/screenshots/screenshot_' +
            testInfo.title +
            '_' +
            nowDate.toISOString().slice(0, 10) +
            '.png';
        await use(screenshotName);
    },
});

export { test, expect };
