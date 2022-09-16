import { MetamaskPage } from './metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Selector } from '../utils/selector';
import { LoaderSelectorEnum } from '../models';
import { SnackbarComponent } from './components/snackbar.component';

export abstract class BaseAbstract {
  metamaskPage: MetamaskPage;
  snackbar: SnackbarComponent = new SnackbarComponent();

  constructor() {
    this.initMetamask();
  }

  public async waitForLoaderDisappear() {
    await page.waitForSelector(LoaderSelectorEnum.Loader, {
      hidden: true,
      timeout: 30000,
    });
  }

  async waitForPreloaderDisappear() {
    await page.waitForSelector(LoaderSelectorEnum.PreLoader, { hidden: false });
  }

  async closeSnackbar() {
    await new SnackbarComponent().closeSnackbar();
  }

  private async initMetamask() {
    this.metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
  }
}
