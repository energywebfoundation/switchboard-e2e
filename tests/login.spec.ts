import { CONFIG } from '../src/config';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Select } from '../src/select';
import { MetamaskPage } from '../src/pages/metamask.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { DashboardPage } from '../src/pages/dashboard.page';

describe('login tests', () => {
  let metamaskPage: MetamaskPage;
  let welcomePage: WelcomePage;
  let dashboardPage: DashboardPage;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    await page.goto(CONFIG.page, {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});

    metamaskPage = new MetamaskPage((await getMetamaskWindow(browser)));
    welcomePage = new WelcomePage();
    dashboardPage = new DashboardPage();
    await welcomePage.waitForLoadingWelcomePage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('should display snackbar when rejecting metamask', async () => {
    await welcomePage.rejectMetamaskLogin();

    expect(await page.waitForSelector('.toast-container .toast-error')).toBeTruthy();
  });

  it('should successfully login and after logout navigate to welcome page', async () => {
    await welcomePage.loginWithMetamask();

    await page.bringToFront();

    expect(await dashboardPage.isVisible()).toBeTruthy();
    await page.waitForTimeout(3000);
    await dashboardPage.logout();

    expect(await welcomePage.isWelcomePage()).toBeTruthy();
  });

  xit('should display dialog information when switching network', () => {

  });

  xit('should display dialog information when switching account', () => {

  });

  it('should navigate to dashboard page, when refreshing page after successful login', async () => {
    // TODO: fix this test to work solo run. Now it works when it is run with others tests.
    await welcomePage.loginWithMetamask();

    await page.bringToFront();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.reload();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  it('should display network to volta when ethereum network is enabled', async () => {
    await welcomePage.openWithEthereum();

    expect(await welcomePage.isWrongNetworkDisplayed()).toBeTruthy();
    await metamaskPage.switchToVolta();
  });

  it('should display popup when localstorage contains data, but user reject metamask', async() => {
    await welcomePage.accountNotConnectedToMetamask()

    await page.goto(CONFIG.page + '/dashboard', {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});

    await dashboardPage.rejectMetamaskWhenReinitializing();

    expect(await page.waitForSelector('.swal-modal')).toBeTruthy();
  });
});
