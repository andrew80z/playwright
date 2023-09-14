import { PlaywrightMainPage } from '../page/mainPage';
import { test, expect} from '@playwright/test';
import { PlaywrightAbPage } from '../page/abPage';
import { PlaywrightAddRemoveElPage } from '../page/addRemove-elements-page';
import { PlaywrightCheckboxPage } from '../page/checkboxesPage';
import { PlaywrightDropDownPage } from '../page/dropDownPage';
import { firefox } from '@playwright/test';
import { DownloadFilePage} from '../page/downloadFile.Page';
import fs from "fs";


test.describe('Heroku-app page testing', () => {
  const browser = firefox.launch();
  let nowDate = new Date();
  let screenshotName = '.test-results/screenshots/screenshot_'+test.name+'_'+nowDate.toString().slice(0,10)+'.png';
  
  test.beforeEach(async ({ page }) =>{
    const mainPage = new PlaywrightMainPage(page);
    const playwrightAb = new PlaywrightAbPage(page);
    await mainPage.goto();
  })
  
  test.afterEach( async () =>{
   // await (await browser).close();
  }); 
    
    test('A\B testing should contain content', async ({ page }) => {
      let headTextAb = 'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).';
      //await (await browser).newPage();
      const mainPage = new PlaywrightMainPage(page);
      const playwrightAb = new PlaywrightAbPage(page);
      await mainPage.abTestingButton.click();
      await expect(playwrightAb.abHeaderLabel).toBeVisible();
      await page.screenshot({ path: screenshotName});
      await expect(playwrightAb.abTestingContent).toHaveText(headTextAb);
    });

    test('Add/Remove Elements buttons behavior', async ({ page }) => {
      const addRemoveEl = new PlaywrightAddRemoveElPage(page);
      const mainPage = new PlaywrightMainPage(page);
      await mainPage.addRemoveButton.click();
      await expect(addRemoveEl.addRemoveHeader).toBeVisible();
      await expect(addRemoveEl.delButton).not.toBeVisible();
      await page.screenshot({ path: screenshotName});
      await addRemoveEl.addButton.click();
      await expect(addRemoveEl.delButton).toBeVisible();
      await page.screenshot({ path: screenshotName});
      await addRemoveEl.delButton.click();
      await expect(addRemoveEl.delButton).not.toBeVisible();
    });

    test('Checkboxes behavior', async ({ page }) => {
      const checkboxesPage = new PlaywrightCheckboxPage(page);
      const mainPage = new PlaywrightMainPage(page);
      await mainPage.checkboxesButton.click();
      expect(checkboxesPage.checkbox1).not.toBeChecked;
      expect(checkboxesPage.checkbox2).toBeChecked;
      await checkboxesPage.checkbox1.click();
      expect(checkboxesPage.checkbox1).toBeChecked;
      await checkboxesPage.checkbox2.click();
      expect(checkboxesPage.checkbox2).not.toBeChecked;
    });

    test('Dropdown behavior', async ({ page }) => {
      const dropDownPage = new PlaywrightDropDownPage(page);
      const mainPage = new PlaywrightMainPage(page);
      await mainPage.dropDownButton.click();
      await expect(dropDownPage.defaultOption).toHaveAttribute('selected', 'selected');
      await dropDownPage.dropDownExpand.click();
      await dropDownPage.dropDownMenu.selectOption('Option 1');
      await expect(dropDownPage.ddOption1).toHaveAttribute('selected', 'selected');
      await dropDownPage.dropDownMenu.selectOption('Option 2');
      await expect(dropDownPage.ddOption2).toHaveAttribute('selected', 'selected');
    });

    test.only('File download', async ({page}) => {
      const mainPage = new PlaywrightMainPage(page);
      const downloadFilePage = new DownloadFilePage(page);
      
      const filename = 'Internet_April_1694613502959.pdf';
      const savePath = './page/data/tmpDownload/'
      await mainPage.fileDownloadButton.click();
      const downloadPromise = page.waitForEvent('download');
      await downloadFilePage.pdfDownloadButton.click();
      const download = await downloadPromise;
      const finFilePath = savePath+filename
      // Wait for the download process to complete
      console.log(await download.path());
      // Save downloaded file somewhere
      await download.saveAs(finFilePath);
      let pdf = require('pdf-parse');
      let dataBuffer = fs.readFileSync(finFilePath);
      await pdf(dataBuffer).then(function(data: any){
        console.log(data.text.split('\n'));
      });
      fs.unlinkSync(finFilePath);
    });
    


});
