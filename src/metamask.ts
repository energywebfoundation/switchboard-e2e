import dappeteer, { launch, setupMetamask } from '@chainsafe/dappeteer';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Select } from './select';


export class Metamask {
  static browser: Browser;
  static dappeteer;
  static metamask;

  static async setup(browser, account): Promise<dappeteer.Dappeteer> {
    Metamask.dappeteer = await setupMetamask(browser, {
      seed: account.seed,
      password: account.password
    });
    await Metamask.addVoltaNetwork(Metamask.dappeteer);

    return Metamask.dappeteer;
  }

  static async addVoltaNetwork(metamask) {
    // const popover = await Metamask.metamask.waitForSelector('[data-testid="popover-close"]');
    // if (popover) {
    //   await popover.click();
    // }
    await metamask.addNetwork({
      networkName: 'Volta',
      rpc: 'https://volta-rpc.energyweb.org',
      chainId: 73799,
      symbol: 'VT',
      explorer: 'http://volta-explorer.energyweb.org/'
    });
  }

  static async getMetamaskWindow(browser): Promise<Page> {
    Metamask.metamask = await new Promise((resolve) => {
      browser.pages().then((pages) => {
        for (const page of pages) {
          if (page.url().includes('chrome-extension')) resolve(page);
        }
      });
    });

    return Metamask.metamask;
  }

  static async launch(browser: any = puppeteer) {
    Metamask.browser = await launch(browser, {metamaskVersion: '10.1.1'});
    return Metamask.browser;
  }

  static async sign(metamaskWindow: Page) {
    const popover = await Select.byTestData(metamaskWindow, 'popover-close');
    await popover.click();
    const button2 = await Select.byTestData(metamaskWindow, 'home__activity-tab');
    await button2.click();

    const unconfirmed = await metamaskWindow.waitForSelector('.transaction-list-item--unconfirmed');
    await unconfirmed.click();

    const sign = await Select.byTestData(metamaskWindow, 'request-signature__sign');
    await sign.click();
  }

  static async bringToFront() {
    await Metamask.metamask.bringToFront();
    await Metamask.metamask.reload();


    const popover1 = await Metamask.metamask.$('[data-testid="popover-close"]');
    if (popover1) {
      await popover1.click();
    }
  }
}
