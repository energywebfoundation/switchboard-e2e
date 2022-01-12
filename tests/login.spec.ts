import { CONFIG } from '../src/config';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Select } from '../src/select';
import { MetamaskPage } from '../src/pages/metamask.page';
import { WelcomePage } from '../src/pages/welcome.page';

describe('login tests', () => {
  let metamaskPage: MetamaskPage;
  let welcomePage: WelcomePage;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    // await page.setViewport({width: 1024, height: 600, hasTouch: true});
    await page.goto(CONFIG.page, {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});

    metamaskPage = new MetamaskPage((await getMetamaskWindow(browser)));
    welcomePage = new WelcomePage();
    await page.waitForTimeout(5000);
  });

  it('should display snackbar when rejecting metamask', async () => {
    await welcomePage.selectMetamask();

    await metamaskPage.reject();

    expect(await page.waitForSelector('.toast-container .toast-error')).toBeTruthy();
  });

  it('should successfully login and after logout navigate to welcome page', async () => {
    await welcomePage.selectMetamask();

    await metamaskPage.approve();

    await metamaskPage.sign();

    await page.bringToFront();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.evaluate(() => {
      localStorage.clear();
    });
    // expect(await page.waitForSelector('.btn-connect-metamask')).toBeTruthy();
  });

  xit('should switch network to volta', () => {

  });

  xit('should display dialog information when switching network', () => {

  });

  xit('should display dialog information when switching account', () => {

  });

  it('should navigate to dashboard page, when refreshing page after successful login', async() => {
    // TODO: fix this test to work solo runned. Now it works when it is run with others tests.
    await welcomePage.selectMetamask();
    await metamaskPage.closePopOver();
    await metamaskPage.sign();

    await page.bringToFront();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.reload();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.evaluate(() => {
      localStorage.clear();
    });
  });


});
