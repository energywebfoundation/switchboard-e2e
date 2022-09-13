import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { MetamaskPage } from '../src/pages/metamask.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { DashboardPage } from '../src/pages/dashboard.page';
import { Router } from '../src/utils/';
import { PopupPage } from '../src/pages/popup.page';
import { RouterPathEnum } from '../src/models/router-path.enum';

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
    await welcomePage.waitForPreloaderDisappear();
  });

  afterEach(async () => {
    await page.close();
  });

  it('test', async () => {
    await welcomePage.selectWalletConnect();
    await page.waitForTimeout(10000);
  });

  it('should display snackbar when rejecting metamask', async () => {
    await welcomePage.rejectMetamaskLogin();

    expect(
      await page.waitForSelector('.toast-container .toast-error')
    ).toBeTruthy();
  });

  it('should successfully login and after logout navigate to welcome page', async () => {
    await welcomePage.loginWithMetamask();
    await page.bringToFront();

    await dashboardPage.isVisible();
    await page.waitForTimeout(3000);
    await dashboardPage.logout();

    expect(await welcomePage.isWelcomePage()).toBeTruthy();
  });

  xit('should display dialog information when switching network', () => {});

  xit('should display dialog information when switching account', () => {});

  it('should navigate to dashboard page, when refreshing page after successful login', async () => {
    await welcomePage.loginWithMetamask();

    await page.bringToFront();
    await dashboardPage.isVisible();
    await page.reload();
    await dashboardPage.isVisible();
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  it('should display network to volta when ethereum network is enabled', async () => {
    await welcomePage.openWithEthereum();

    expect(await welcomePage.isWrongNetworkDisplayed()).toBeTruthy();
    await welcomePage.switchToVolta();
  });

  it('should display popup when localstorage contains data, but user reject metamask', async () => {
    await welcomePage.accountNotConnectedToMetamask();

    await Router.navigateTo(RouterPathEnum.Dashboard);

    await dashboardPage.rejectMetamaskWhenReinitializing();

    await popupPage.isDisplayed();
  });
});
