import { getMetamaskWindow, setupMetamask } from '@chainsafe/dappeteer';
import { clickOnButton } from '@chainsafe/dappeteer/dist/helpers';

export const setupVoltaMetamask = async () => {
  const dappeteer = await setupMetamask(browser, {
    seed: 'allow special exercise item pretty cliff fitness foam acquire about truth bone',
    password: '123456789',
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
