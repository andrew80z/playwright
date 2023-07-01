import { Locator, Page } from '@playwright/test';

export class PlaywrightAddRemoveElPage{
    readonly page: Page;
    readonly addRemoveButton: Locator;
    readonly addRemoveHeader: Locator;
    readonly addButton: Locator;
    readonly delButton: Locator;

    constructor(page: Page) {
    this.addRemoveButton = page.locator('a', { hasText: 'Add/Remove Elements' });
    this.addRemoveHeader = page.locator('h3', { hasText: 'Add/Remove Elements' });
    this.addButton = page.locator('button', {hasText: "Add Element"});
    this.delButton = page.locator('button', {hasText: "Delete"});
    }
}