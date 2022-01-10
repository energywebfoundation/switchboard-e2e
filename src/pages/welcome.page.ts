import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';

export class WelcomePage extends BaseAbstract {
  async selectMetamask() {
    await page.click(this.getByTestId(WelcomeSelector.MetamaskButton));
  }

  async selectAzure() {
    await page.click(this.getByTestId(WelcomeSelector.AzureButton));
  }

  async selectWalletConnect() {
    await page.click(this.getByTestId(WelcomeSelector.WalletConnect));
  }


}
