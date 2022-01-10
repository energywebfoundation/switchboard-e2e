import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';

export class WelcomePage extends BaseAbstract {
  async selectMetamask() {
    await page.click(this.getSelector(WelcomeSelector.MetamaskButton));
  }

  async selectAzure() {
    await page.click(this.getSelector(WelcomeSelector.AzureButton));
  }

  async selectWalletConnect() {
    await page.click(this.getSelector(WelcomeSelector.WalletConnect));
  }


}
