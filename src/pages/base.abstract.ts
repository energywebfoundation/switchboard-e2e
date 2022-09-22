import { MetamaskPage } from './metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { SnackbarComponent } from './components/snackbar.component';
import { LoaderPage } from './loader.page';

export abstract class BaseAbstract {
  metamaskPage: MetamaskPage;
  snackbar: SnackbarComponent = new SnackbarComponent();
  protected loader: LoaderPage = new LoaderPage();

  constructor() {
    this.initMetamask();
  }

  public async waitForLoaderDisappear() {
    await this.loader.waitForLoaderDisappear();
  }

  async waitForPreloaderDisappear() {
    await this.loader.waitForPreloaderDisappear();
  }

  async closeSnackbar() {
    await new SnackbarComponent().closeSnackbar();
  }

  private async initMetamask() {
    this.metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
  }
}
