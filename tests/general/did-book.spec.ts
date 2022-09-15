import { MetamaskPage } from '../../src/pages/metamask.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login } from '../../src/utils';
import { DidBookPage } from '../../src/pages/did-book.page';
import { generateRandomDid } from '../../src/utils/generate-random-did';

describe('DID Book tests', () => {
  let metamaskPage: MetamaskPage;
  let dashboardPage: DashboardPage;
  let didBookPage: DidBookPage;
  let  login: Login;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    login = await new Login(metamaskPage);
    await login.reinitializeIfNeeded();

    dashboardPage = new DashboardPage();
    await dashboardPage.waitForPreloaderDisappear();

    didBookPage = new DidBookPage();
  });

  afterEach(async () => {
    await login.clear();
    await page.close();
  });

  it('should open DID Book, add new record and find it on the list and remove', async () => {
    await dashboardPage.header.openDIDBook();

    await didBookPage.waitForLoad();
    await didBookPage.setLabel();
    await didBookPage.setDID(generateRandomDid());
    await didBookPage.addButtonIsEnabled();
    await didBookPage.addRecord();

    await dashboardPage.waitForLoaderDisappear();
    await dashboardPage.closeSnackbar();

    await page.waitForTimeout(3000);
    await didBookPage.findDID();

    await didBookPage.amountOfRecords(1);

    await page.waitForTimeout(1000);

    await didBookPage.removeRecord(0);
    await page.waitForTimeout(1000);
    await didBookPage.amountOfRecords(0);
  });
});
