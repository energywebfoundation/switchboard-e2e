import { setupMetamask } from '@chainsafe/dappeteer';

export const setupVoltaMetamask = async () => {
  const dappeteer = await setupMetamask(browser, {
    seed: 'allow special exercise item pretty cliff fitness foam acquire about truth bone',
    password: '123456789'
  });
  await     dappeteer.addNetwork({
    networkName: 'Volta',
    rpc: 'https://volta-rpc.energyweb.org',
    chainId: 73799,
    symbol: 'VT',
    explorer: 'http://volta-explorer.energyweb.org/'
  });

}
