import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';
import { Dappeteer } from '@chainsafe/dappeteer';

export class MetamaskPage {

  constructor(private dappeteer: Dappeteer) {
  }

  get page(): Page {
    return this.dappeteer.page;
  }

  async approve(): Promise<void> {
    await this.closePopOver();

    await this.dappeteer.approve();
  }

  async closePopOver() {
    await this.bringToFrontAndReload();
    if (await this.page.$(this.getByTestId(MetamaskSelector.PopoverClose))) {
      await this.page.click(this.getByTestId(MetamaskSelector.PopoverClose));
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

  private getByTestId(attribute: string): string {
    return `[data-testid="${attribute}"]`;
  }
}
