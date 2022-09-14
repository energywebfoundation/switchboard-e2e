import { RouterPathEnum } from '../models/router-path.enum';
import { Router } from './router';
import { MetamaskPage } from '../pages/metamask.page';
import { LoaderPage } from '../pages/loader.page';

export class Login {
  loaderPage = new LoaderPage();
  constructor(private metamaskPage: MetamaskPage) {}

  async prepareForReinitialization() {
    try {
      await this.loaderPage.waitForPreloaderDisappear();
      await page.evaluate(() => {
        localStorage.setItem('ProviderType', 'MetaMask');
        localStorage.setItem('isEthSigner', 'true');
        localStorage.setItem(
          'PublicKey',
          '0230379d9ecb9d8cc7a41beff5ec8b7382db7f38df0b9d3188ffce57ac0557c755'
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  async reinitialize(route: RouterPathEnum = RouterPathEnum.Dashboard) {
    await Router.navigateTo(route);
    await this.prepareForReinitialization();
  }

  async reinitializeIfNeeded(route: RouterPathEnum = RouterPathEnum.Dashboard) {
    await Router.navigateTo();
    await this.loaderPage.waitForPreloaderDisappear();
    const hasData = await page.evaluate(() => {
      return Boolean(
        localStorage.getItem('ProviderType') &&
          localStorage.getItem('isEthSigner') &&
          localStorage.getItem('PublicKey')
      );
    });

    console.log('hasData', hasData);

    if (!hasData) {
      await this.prepareForReinitialization();
      await Router.navigateTo(route);

      await this.metamaskPage.approve();
      await this.metamaskPage.sign();
      await page.bringToFront();
      await this.loaderPage.waitForLoaderDisappear();
    }
  }

  async clear() {
    await page.evaluate(() => {
      localStorage.clear();
    });
  }
}
