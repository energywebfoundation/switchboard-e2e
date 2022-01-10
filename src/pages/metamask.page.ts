import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';

export class MetamaskPage {


  constructor(private page: Page) {
  }

  async closePopOver() {
    if (await this.page.$(`[data-testid="${MetamaskSelector.PopoverClose}"]`)) {
      await this.page.click(`[data-testid="${MetamaskSelector.PopoverClose}"]`);
    }
  }

  async bringToFrontAndReload() {
    await this.page.bringToFront();
    await this.page.reload();
  }
}
