import { MetamaskPage } from '../src/pages/metamask.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { DashboardPage } from '../src/pages/dashboard.page';
import { PopupPage } from '../src/pages/popup.page';
import { Router } from '../src/utils';
import { getMetamaskWindow } from '@chainsafe/dappeteer';

describe('login tests', () => {
  let metamaskPage: MetamaskPage;
  let welcomePage: WelcomePage;
  let dashboardPage: DashboardPage;
  let popupPage: PopupPage;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    await Router.navigateTo();

    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    welcomePage = new WelcomePage();
    dashboardPage = new DashboardPage();
    popupPage = new PopupPage();
    await welcomePage.waitForLoadingWelcomePage();
  });

  afterEach(async () => {
    await page.close();
  });
})
