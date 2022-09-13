import { MetamaskPage } from './metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Selector } from '../utils/selector';
import { Login } from '../utils/login';
import { LoaderSelectorEnum } from '../models';
import { CONFIG } from '../config';
import { Router } from '../utils';

export abstract class BaseAbstract {
  metamaskPage: MetamaskPage;

  constructor() {
    this.initMetamask();
  }

  public async waitForLoaderDisappear() {
    await page.waitForSelector(Selector.byQaId(LoaderSelectorEnum.Loader), {
      hidden: true,
      timeout: 30000,
    });
  }

  async waitForPreloaderDisappear() {
    await page.waitForSelector(LoaderSelectorEnum.PreLoader, { hidden: false });
  }

  async closeSnackbar() {
    await (
      await page.waitForSelector(LoaderSelectorEnum.ToastContainer)
    ).click();
  }

  async prepareForReinitialization() {
    await new Login().prepareForReinitialization();
  }

  private async initMetamask() {
    this.metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
  }
}
