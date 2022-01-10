import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';

export class WelcomePage extends BaseAbstract {
  async isWelcomePage(): Promise<boolean> {
    return Boolean(await page.$('app-welcome'));
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


}
