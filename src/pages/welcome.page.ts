import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';

export class WelcomePage extends BaseAbstract {
  async isWelcomePage(): Promise<boolean> {
    return Boolean(await page.waitForSelector('app-welcome', {visible: true}));
  }

  async openWithEthereum() {
    await this.metamaskPage.switchToEthereum();

    await page.bringToFront();
    await this.waitForLoadingWelcomePage();
  }

  async selectMetamask(): Promise<void> {
    await page.click(this.getSelector(WelcomeSelector.MetamaskButton));
  }

  async rejectMetamaskLogin() {
    await this.selectMetamask();
    await this.metamaskPage.reject();
  }

  async loginWithMetamask() {
    await this.selectMetamask();

    await this.metamaskPage.login();
  }

  async accountNotConnectedToMetamask() {
    await this.metamaskPage.disconnect();

    await page.bringToFront();

    // set localstorage to the page
    await page.evaluate(() => {
      localStorage.setItem('ProviderType', 'MetaMask');
      localStorage.setItem('isEthSigner', 'true');
      localStorage.setItem('PublicKey', '0230379d9ecb9d8cc7a41beff5ec8b7382db7f38df0b9d3188ffce57ac0557c755');
    });
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

  async isWrongNetworkDisplayed() {
    return await page.waitForSelector(this.getSelector(WelcomeSelector.WrongNetwork));
  }
}
