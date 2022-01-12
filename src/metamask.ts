import dappeteer, { getMetamaskWindow, launch, setupMetamask } from '@chainsafe/dappeteer';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Select } from './select';
import { MetamaskSelector } from './models/metamask-selector.enum';


export class Metamask {

  static async setup(browser, account): Promise<dappeteer.Dappeteer> {
    const dappeteer = await setupMetamask(browser, {
      seed: account.seed,
      password: account.password
    });
    await Metamask.addVoltaNetwork(dappeteer);

    return dappeteer;
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
}
