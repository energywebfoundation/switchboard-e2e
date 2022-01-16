import { MetamaskPage } from './metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';

export abstract class BaseAbstract {
  metamaskPage: MetamaskPage;

  constructor() {
    this.initMetamask();
  }

  public async waitForLoaderDisappear() {
    await page.waitForSelector(this.getSelector('loading'), {hidden: true});
  }

  protected getSelector(attribute: string): string {
    return `[data-qa-id="${attribute}"]`;
  }

  private async initMetamask() {
    this.metamaskPage = new MetamaskPage((await getMetamaskWindow(browser)));
  }
}
