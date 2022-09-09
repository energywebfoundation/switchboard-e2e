import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';
import { Dappeteer } from '@chainsafe/dappeteer';
import { Select } from '../select';

export class MetamaskPage {
  constructor(private dappeteer: Dappeteer) {}

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

  async login() {
    await this.closePopOver();
    await this.page.waitForTimeout(100);
    if (await this.page.$('button.button.btn-primary')) {
      await this.approve();
    }

    await this.sign();
  }

  async bringToFrontAndReload(): Promise<void> {
    await this.page.bringToFront();
    await this.page.reload();
  }

  async reject(): Promise<void> {
    await this.closePopOver();

    await (
      await this.page.waitForSelector(MetamaskSelector.CancelButton)
    ).click();
  }

  async disconnect(): Promise<void> {
    try {
      await this.closePopOver();
      const connectedStatus = await this.page.waitForSelector(
        this.getSelector('account-options-menu-button')
      );
      await connectedStatus.click();

      const options = await this.page.waitForSelector(
        '.account-options-menu__connected-sites'
      );
      await options.click();

      if (!(await this.page.$('.connected-sites-list__trash'))) {
        await this.closePopOver();
        return;
      }
      const trashIcon = await this.page.waitForSelector(
        '.connected-sites-list__trash'
      );
      await trashIcon.click();

      const disconnectButton = await this.page.waitForSelector(
        'button.button.btn-primary'
      );
      await disconnectButton.click();
    } catch (e) {
      console.log(e);
    }
  }

  async sign() {
    const button2 = await Select.byTestData(this.page, 'home__activity-tab');
    await button2.click();

    const unconfirmed = await this.page.waitForSelector(
      '.transaction-list-item--unconfirmed'
    );
    await unconfirmed.click();

    const sign = await Select.byTestData(this.page, 'request-signature__sign');
    await sign.click();
  }

  protected getSelector(attribute: string): string {
    return `[data-testid="${attribute}"]`;
  }
}
