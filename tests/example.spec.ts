import { test, expect } from './fixtures';
import { firefox } from '@playwright/test';
import fs from 'fs';

test.describe('Heroku-app page testing', () => {
  const browser = firefox.launch();

  test('A/B testing should contain content', async ({ page, mainPage, playwrightAb, screenshotName }) => {
    const headTextAb =
      'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).';

    await test.step('Prerequisite', async () => {
      await mainPage.abTestingButton.waitFor({ state: 'visible' });
    });
    await test.step('Click button', async () => {
      await mainPage.abTestingButton.click({ force: true });
    });
    await test.step('Verify results', async () => {
      await expect(playwrightAb.abHeaderLabel).toBeVisible();
      await page.screenshot({ path: screenshotName });
      await expect(playwrightAb.abTestingContent).toHaveText(headTextAb);
    });
  });

  test('Add-Remove Elements buttons behavior', async ({ page, addRemoveEl }) => {
    await test.step('Prerequisite', async () => {
      const testUrl = `/add_remove_elements/`;
      await page.goto(testUrl);

    });
    await test.step('Verify Add-Remove buttons visibility', async () => {
      await expect(addRemoveEl.addRemoveHeader).toBeVisible();
      await expect(addRemoveEl.delButton).not.toBeVisible();
    });
    await test.step('Verify Add button', async () => {
      await addRemoveEl.addButton.click();
      await expect(addRemoveEl.delButton).toBeVisible();
    });
    await test.step('Verify Del button', async () => {
      await addRemoveEl.delButton.click();
      await expect(addRemoveEl.delButton).not.toBeVisible();
    });
  });

  test('Checkboxes behavior', async ({ page, checkboxesPage }) => {
    const testUrl = `/checkboxes`;
    await test.step('Prerequisite', async () => {
      await page.goto(testUrl);
      await expect(checkboxesPage.checkbox1).not.toBeChecked();
      await expect(checkboxesPage.checkbox2).toBeChecked();
    });
    await test.step('Checkbox1 behavior verification', async () => {
      await checkboxesPage.checkbox1.click();
      await expect(checkboxesPage.checkbox1).toBeChecked();
    });
    await test.step('Checkbox2 behavior verification', async () => {
      await checkboxesPage.checkbox2.click();
      await expect(checkboxesPage.checkbox2).not.toBeChecked();
    });
  });

  test('Dropdown behavior', async ({ page, dropDownPage }) => {
    await test.step('Prerequisite', async () => {
      const testUrl = `/dropdown`;
      await page.goto(testUrl);
    });
    await expect(dropDownPage.defaultOption).toHaveAttribute(
      'selected',
      'selected'
    );
    await test.step('Option #1 selection and verification', async () => {
      await dropDownPage.dropDownExpand.click();
      await dropDownPage.dropDownMenu.selectOption('Option 1');
      await expect(dropDownPage.ddOption1).toHaveAttribute(
        'selected',
        'selected'
      );
    });
    await test.step('Option #2 selection and verification', async () => {
      await dropDownPage.dropDownExpand.click();
      await dropDownPage.dropDownMenu.selectOption('Option 2');
      await expect(dropDownPage.ddOption2).toHaveAttribute(
        'selected',
        'selected'
      );
    });
  });

  test('File download', async ({ page, downloadFilePage }) => {
    const testUrl = `/download`;
    let finFilePath: string;
    const savePath = './page/data/tmpDownload/';
    await test.step('Prerequisite', async () => {
      await page.goto(testUrl);
    });
    await test.step('Download and verify file', async () => {
      const downloadButton = await downloadFilePage.pdfDownloadButton.nth(0);
      await downloadButton.waitFor({ state: 'visible' });
      const fileName = await downloadButton.innerText();
      console.log('File name to download: ' + fileName);
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloadButton.click(),
      ]);
      finFilePath = savePath + fileName;
      // Wait for the download process to complete
      console.log(await download.path());
      // Save downloaded file somewhere
      await download.saveAs(finFilePath);
    });
    await test.step('File content verification', async () => {
      // Verify the download process
      const pdf = require('pdf-parse');
      const dataBuffer = fs.readFileSync(finFilePath);
      await pdf(dataBuffer).then(function (data: { text: string }) {
        console.log(data.text.split('\n'));
      });
      fs.unlinkSync(finFilePath);
    });
  });
});