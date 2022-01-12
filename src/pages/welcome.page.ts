import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';

export class WelcomePage extends BaseAbstract {
  async isWelcomePage(): Promise<boolean> {
    return Boolean(await page.waitForSelector('app-welcome', {visible: true}));
  }

  async selectMetamask(): Promise<void> {
    await page.click(this.getSelector(WelcomeSelector.MetamaskButton));
  }

  async selectAzure(): Promise<void> {
    await page.click(this.getSelector(WelcomeSelector.AzureButton));
  }

  async selectWalletConnect(): Promise<void> {
    await page.click(this.getSelector(WelcomeSelector.WalletConnect));
  }

  async waitForLoadingWelcomePage() {
    await page.waitForSelector('.preloader-hidden', {hidden: false});
  }
}
