import { MetamaskPage } from '../../src/pages/metamask.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login } from '../../src/utils';
import { DidBookPage } from '../../src/pages/did-book.page';
import { generateRandomDid } from '../../src/utils/generate-random-did';
import { CONFIG } from '../../src/config';
import { AssetPage } from '../../src/pages/asset.page';
import { waitForTimeout } from '../../src/utils/wait-for-timeout';

describe('E2E tests', () => {
  let metamaskPage: MetamaskPage;
  let dashboardPage: DashboardPage;
  let didBookPage: DidBookPage;
  let login: Login;
  let assetsPage: AssetPage;

  beforeAll(async () => {
    (global as any)['page'] = await browser.newPage();
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    login = await new Login(metamaskPage);
    await login.reinitializeIfNeeded();
  });

  describe('did book', () => {
    beforeAll(() => {
      dashboardPage = new DashboardPage();

      didBookPage = new DidBookPage();
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
    });

    it('should remove record from list', async () => {
      await waitForTimeout(3000);
      await didBookPage.findDID();
      await waitForTimeout(1000);

      await didBookPage.amountOfRecords(1);

      await waitForTimeout(1000);

      await didBookPage.removeRecord(0);
      await waitForTimeout(1000);
      await didBookPage.amountOfRecords(0);
      await didBookPage.close();
    });
  });

  describe('assets', () => {
    beforeAll(async () => {
      assetsPage = new AssetPage();
      await assetsPage.goToAssets();
      // await Router.navigateTo(RouterPathEnum.Assets);
      // await page.waitForNavigation({
      //   waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
      // });
      await assetsPage.waitForLoaderDisappear();
    });
    it('should register asset', async () => {
      await assetsPage.registerAsset();
    });

    it('should change asset name', async () => {
      await assetsPage.openEditAction();

      await assetsPage.editAsset({
        name: 'Test name',
        iconUrl: 'https://fajnepodroze.pl/wp-content/uploads/2020/04/gil.jpg',
      });
    });

    it('should transfer created asset to different DID', async () => {
      await assetsPage.openTransferAction();
      await assetsPage.transferOwnershipTo(CONFIG.publicKeyForTransfer);
    });

    it('should cancel ownership transfer', async () => {
      await assetsPage.cancelTransferAction();
      await assetsPage.confirmCancel();
    });

    it('should check asset history', async () => {
      await assetsPage.openHistory();
      await assetsPage.checkHistoryElement(0, { type: 'ASSET_CREATED' });
      await assetsPage.checkHistoryElement(1, { type: 'ASSET_OFFERED' });
      await assetsPage.checkHistoryElement(2, { type: 'ASSET_OFFER_CANCELED' });
    });
  });

  afterAll(async () => {
    await page.close();
  });
});
