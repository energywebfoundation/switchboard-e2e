import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';

export class MetamaskPage {


  constructor(private page: Page) {
  }

  async closePopOver() {
    await this.bringToFrontAndReload();
    if (await this.page.$(`[data-testid="${MetamaskSelector.PopoverClose}"]`)) {
      await this.page.click(`[data-testid="${MetamaskSelector.PopoverClose}"]`);
    }
  }

  async bringToFrontAndReload() {
    await this.page.bringToFront();
    await this.page.reload();
  }

  async reject() {
    await this.closePopOver();

    await (await this.page.waitForSelector(MetamaskSelector.CancelButton)).click();
  }
}
