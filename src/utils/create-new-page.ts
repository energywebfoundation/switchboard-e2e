import { MetamaskPage } from '../pages/metamask.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login } from './login';

export const createNewPage = async () => {
  (global as any)['page'] = await browser.newPage();
  const login = await new Login(
    new MetamaskPage(await getMetamaskWindow(browser))
  );
  await login.reinitializeIfNeeded();
};
