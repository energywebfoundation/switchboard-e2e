import { BaseAbstract } from './base.abstract';
import { Selector } from '../utils';
import { WelcomeSelector } from '../models';

export class WelcomePage extends BaseAbstract {
  async isWelcomePage(): Promise<boolean> {
    return Boolean(
      await page.waitForSelector('app-welcome', { visible: true })
    );
  }

  async openWithEthereum() {
    await this.metamaskPage.switchToEthereum();

    await page.bringToFront();
    await this.waitForPreloaderDisappear();
  }

  async switchToVolta() {
    await this.metamaskPage.switchToVolta();
  }

  async selectMetamask(): Promise<void> {
    await page.waitForSelector(
      Selector.byQaId(WelcomeSelector.MetamaskButton),
      { visible: true }
    );
    await (
      await page.waitForSelector(
        Selector.byQaId(WelcomeSelector.MetamaskButton)
      )
    ).click();
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
  }

  async selectAzure(): Promise<void> {
    await page.click(Selector.byQaId(WelcomeSelector.AzureButton));
  }

  async selectWalletConnect(): Promise<void> {
    const walletConnect = await page.waitForSelector(
      Selector.byQaId(WelcomeSelector.WalletConnect)
    );
    await walletConnect.click();
  }

  async isWrongNetworkDisplayed() {
    return await page.waitForSelector(
      Selector.byQaId(WelcomeSelector.WrongNetwork)
    );
  }

  async shouldShowError() {
    expect(
      await page.waitForSelector('.toast-container .toast-error')
    ).toBeTruthy();
  }
}
