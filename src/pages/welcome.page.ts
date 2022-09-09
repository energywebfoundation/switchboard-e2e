import { WelcomeSelector } from '../models/welcome-selector.enum';
import { BaseAbstract } from './base.abstract';
import { CONFIG } from '../config';

export class WelcomePage extends BaseAbstract {
  async isWelcomePage(): Promise<boolean> {
    return Boolean(
      await page.waitForSelector('app-welcome', { visible: true })
    );
  }

  async openWithEthereum() {
    await this.metamaskPage.switchToEthereum();

    await page.bringToFront();
    await this.waitForLoadingWelcomePage();
  }

  async switchToVolta() {
    await this.metamaskPage.switchToVolta();
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
    await page.bringToFront();

    // set localstorage to the page
    await this.fillLocalstorageWithDataForReinitialization();
  }

  async fillLocalstorageWithDataForReinitialization() {
    await page.evaluate(() => {
      localStorage.setItem('ProviderType', 'MetaMask');
      localStorage.setItem('isEthSigner', 'true');
      localStorage.setItem('PublicKey', CONFIG.publicKey);
    });
  }

  async selectAzure(): Promise<void> {
    await page.click(this.getSelector(WelcomeSelector.AzureButton));
  }

  async selectWalletConnect(): Promise<void> {
    const walletConnect = await page.waitForSelector(
      this.getSelector(WelcomeSelector.WalletConnect)
    );
    await walletConnect.click();
  }

  async waitForLoadingWelcomePage() {
    await page.waitForSelector('.preloader-hidden', { hidden: false });
  }

  async isWrongNetworkDisplayed() {
    return await page.waitForSelector(
      this.getSelector(WelcomeSelector.WrongNetwork)
    );
  }
}
