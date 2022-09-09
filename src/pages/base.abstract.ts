import { MetamaskPage } from './metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { CONFIG } from '../config';
import { LoaderSelectorEnum } from '../models/loader-selector.enum';
import { MetamaskSelector } from '../models/metamask-selector.enum';
import { Selector } from '../utils/selector';

export abstract class BaseAbstract {
  metamaskPage: MetamaskPage;

  constructor() {
    this.initMetamask();
  }

  public async waitForLoaderDisappear() {
    await page.waitForSelector(Selector.byQaId(LoaderSelectorEnum.Loader), { hidden: true });
  }

  public async reinitializeUser() {
    await this.fillLocalstorageWithDataForReinitialization();

    if(await page.$(Selector.byQaId(LoaderSelectorEnum.Loader))) {
      await this.metamaskPage.sign();
    }
  }

  async fillLocalstorageWithDataForReinitialization() {
    await page.evaluate(() => {
      localStorage.setItem('ProviderType', 'MetaMask');
      localStorage.setItem('isEthSigner', 'true');
      localStorage.setItem('PublicKey', CONFIG.publicKey);
    });
  }

  private async initMetamask() {
    this.metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
  }
}
