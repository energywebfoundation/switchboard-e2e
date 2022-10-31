import { getMetamaskWindow, setupMetamask } from '@chainsafe/dappeteer';
import { clickOnButton } from '@chainsafe/dappeteer/dist/helpers';

export const setupVoltaMetamask = async () => {
  const dappeteer = await setupMetamask(browser, {
    seed: process.env.SEED,
    password: process.env.PASSWORD,
  });
  try {
    await dappeteer.addNetwork({
      networkName: 'Volta',
      rpc: 'https://volta-rpc.energyweb.org',
      chainId: 73799,
      symbol: 'VT',
    });
  } catch (e) {
    console.log('error from adding network');
    const metamask = await getMetamaskWindow(browser);
    await metamask.page.waitForTimeout(1000);
    await clickOnButton(metamask.page, 'Save');
    await metamask.page.waitForTimeout(1000);
  }
};
