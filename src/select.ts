import { Page } from 'puppeteer';

export class Select {
  static byTestData(page: Page, attribute: string) {
    return page.waitForSelector(`[data-testid="${attribute}"]`);
  }

  static byQaData(attribute: string) {
    return page.waitForSelector(`[data-qa-id="${attribute}"]`);
  }
}
