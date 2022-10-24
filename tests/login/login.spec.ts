import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { DashboardPage, MetamaskPage, PopupPage, WelcomePage } from '../../src/pages';
import { Login, Router } from '../../src/utils/';

describe('login tests', () => {
  let metamaskPage: MetamaskPage;
  let welcomePage: WelcomePage;
  let dashboardPage: DashboardPage;
  let popupPage: PopupPage;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));

    await Router.navigateTo();
    await new Login(metamaskPage).clear();

    welcomePage = new WelcomePage();
    dashboardPage = new DashboardPage();
    popupPage = new PopupPage();
    await welcomePage.waitForPreloaderDisappear();
    await welcomePage.waitForLoaderDisappear();
  });

  afterEach(async () => {
    await page.close();
  });

  it('should display snackbar when rejecting metamask', async () => {
    await page.waitForTimeout(2000);
    await welcomePage.rejectMetamaskLogin();

    await welcomePage.shouldShowError();
  });

  it('should successfully login and after logout navigate to welcome page', async () => {
    await page.waitForTimeout(2000);
    await welcomePage.loginWithMetamask();
    await page.bringToFront();

    await expect(dashboardPage.isVisible()).toBeTruthy();
    await dashboardPage.logout();

    expect(await welcomePage.isWelcomePage()).toBeTruthy();
  });

  it('should display network to volta when ethereum network is enabled', async () => {
    await welcomePage.openWithEthereum();

    expect(await welcomePage.isWrongNetworkDisplayed()).toBeTruthy();
    await welcomePage.switchToVolta();
  });
});
