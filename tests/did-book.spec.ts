import { MetamaskPage } from '../src/pages/metamask.page';
import { DashboardPage } from '../src/pages/dashboard.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login, Router } from '../src/utils';
import { DidBookPage } from '../src/pages/did-book.page';
import { generateRandomDid } from '../src/utils/generate-random-did';

describe('DID Book tests', () => {
  let metamaskPage: MetamaskPage;
  let dashboardPage: DashboardPage;
  let didBookPage: DidBookPage;
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();

    await Router.navigateTo();
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    await new Login().reinitialize();

    dashboardPage = new DashboardPage();
    await dashboardPage.waitForPreloaderDisappear();

    didBookPage = new DidBookPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('should open DID Book, add new record and find it on the list and remove', async () => {
    await metamaskPage.approve();
    await metamaskPage.sign();
    await page.bringToFront();
    await dashboardPage.header.openDIDBook();

    await didBookPage.waitForLoad();
    await didBookPage.setLabel();
    await didBookPage.setDID(generateRandomDid());
    await didBookPage.addButtonIsEnabled();
    await didBookPage.addRecord();

    await dashboardPage.waitForLoaderDisappear();
    await dashboardPage.closeSnackbar();

    await didBookPage.findDID();

    await didBookPage.amountOfRecords(1);

    await page.waitForTimeout(1000);

    await didBookPage.removeRecord(0);
    await page.waitForTimeout(1000);
    await didBookPage.amountOfRecords(0);
  });
});
