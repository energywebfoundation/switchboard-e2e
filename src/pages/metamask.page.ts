import { Page } from 'puppeteer';
import { Dappeteer } from '@chainsafe/dappeteer';
import { Select } from '../select';
import { Selector } from '../utils/selector';
import { MetamaskSelector } from '../models';
import { waitForTimeout } from '../utils/wait-for-timeout';

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

  async confirmTransaction() {
    try {
      await this.page.bringToFront();
      const button2 = await Select.byTestData(this.page, 'home__activity-tab');
      await button2.click();
      const unconfirmed = await this.page.waitForSelector(
        '.transaction-list-item--unconfirmed'
      );
      await unconfirmed.click();
      await this.page.waitForTimeout(1000);
      await (await this.page.waitForSelector(`[data-testid="page-container-footer-next"]:not([disabled])`)).click()

      await page.bringToFront();
    } catch (e) {
      console.log('In confirm transaction');
      console.log(e);
    }

  }

  async acceptSwitch() {
    await this.dappeteer.page.bringToFront();
  }

  async approve(): Promise<void> {
    await this.page.bringToFront();

    await this.dappeteer.approve();
  }

  async closePopOver(): Promise<void> {
    await this.bringToFrontAndReload();
    if (await this.page.$(Selector.byQaId(MetamaskSelector.PopoverClose))) {
      await this.page.click(Selector.byQaId(MetamaskSelector.PopoverClose));
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
        Selector.byQaId('account-options-menu-button')
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
    await this.page.bringToFront();
    await this.page.reload();
    await waitForTimeout(2000);
    console.log('will click home__activity-tab in sign method')
    const button2 = await Select.byTestData(this.page, 'home__activity-tab');
    await button2.click();
    console.log('clicked home__activity-tab in sign method')

    const unconfirmed = await this.page.waitForSelector(
      '.transaction-list-item--unconfirmed'
    );
    await unconfirmed.click();

    const sign = await Select.byTestData(this.page, 'request-signature__sign');
    await sign.click();

    await page.bringToFront();
  }
}
