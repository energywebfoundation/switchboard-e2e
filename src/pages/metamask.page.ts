import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';
import { Dappeteer } from '@chainsafe/dappeteer';
import { Select } from '../select';
import { BaseAbstract } from './base.abstract';

export class MetamaskPage extends BaseAbstract {

  constructor(private dappeteer: Dappeteer) {
    super();
  }

  get page(): Page {
    return this.dappeteer.page;
  }

  async switchToEthereum() {
    await this.dappeteer.switchNetwork('Ethereum');
    await page.reload();
  }

  async switchToVolta() {
    await this.dappeteer.switchNetwork('Volta');
    await page.reload();
  }

  async acceptSwitch() {
    await this.dappeteer.page.bringToFront();
  }

  async approve(): Promise<void> {
    await this.closePopOver();

    await this.dappeteer.approve();
  }

  async closePopOver(): Promise<void> {
    await this.bringToFrontAndReload();
    if (await this.page.$(this.getSelector(MetamaskSelector.PopoverClose))) {
      await this.page.click(this.getSelector(MetamaskSelector.PopoverClose));
    }
  }

  async bringToFrontAndReload(): Promise<void> {
    await this.page.bringToFront();
    await this.page.reload();
  }

  async reject(): Promise<void> {
    await this.closePopOver();

    await (await this.page.waitForSelector(MetamaskSelector.CancelButton)).click();
  }

  async sign() {
    const popover = await Select.byTestData(this.page, 'popover-close');
    await popover.click();
    const button2 = await Select.byTestData(this.page, 'home__activity-tab');
    await button2.click();

    const unconfirmed = await this.page.waitForSelector('.transaction-list-item--unconfirmed');
    await unconfirmed.click();

    const sign = await Select.byTestData(this.page, 'request-signature__sign');
    await sign.click();
  }

  protected getSelector(attribute: string): string {
    return `[data-testid="${attribute}"]`;
  }

}
