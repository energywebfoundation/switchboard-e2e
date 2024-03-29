import {
  AssetPage,
  DashboardPage,
  DidBookPage,
  GovernancePage,
  MetamaskPage,
} from '../../src/pages';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login, waitForTimeout } from '../../src/utils';
import { generateRandomDid } from '../../src/utils/generate-random-did';
import { CONFIG } from '../../src/config';

/**
 * Tests for general functions.
 */
describe('E2E tests', () => {
  let metamaskPage: MetamaskPage;
  let dashboardPage: DashboardPage;
  let didBookPage: DidBookPage;
  let login: Login;
  let assetsPage: AssetPage;
  let governancePage: GovernancePage;

  beforeAll(async () => {
    (global as any)['page'] = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    login = await new Login(metamaskPage);
    await login.reinitializeIfNeeded();
  });

  describe('did book', () => {
    beforeAll(() => {
      dashboardPage = new DashboardPage();

      didBookPage = new DidBookPage();
    });

    // #SW-GE-007
    it('should open DID Book, add new record and find it on the list', async () => {
      await dashboardPage.header.openDIDBook();

      await didBookPage.waitForLoad();
      await didBookPage.setLabel();
      await didBookPage.setDID(generateRandomDid());
      await didBookPage.addButtonIsEnabled();
      await didBookPage.addRecord();

      await dashboardPage.waitForLoaderDisappear();
      await dashboardPage.closeSnackbar();
    });

    // #SW-GE-009
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
    });
    // #SW-AS-001
    it('should register asset', async () => {
      await assetsPage.registerAsset();
    });

    // #SW-AS-006
    it('should change asset name', async () => {
      await assetsPage.openEditAction();

      await assetsPage.editAsset({
        name: 'Test name',
        iconUrl: 'https://fajnepodroze.pl/wp-content/uploads/2020/04/gil.jpg',
      });
    });

    // #SW-AS-004
    it('should transfer created asset to different DID', async () => {
      await assetsPage.openTransferAction();
      await assetsPage.transferOwnershipTo(CONFIG.publicKeyForTransfer);
      await assetsPage.closeDialog();
    });

    //  #SW-AS-005
    it('should cancel ownership transfer', async () => {
      await assetsPage.cancelTransferAction();
      await assetsPage.confirmCancel();
      await assetsPage.closeDialog();
    });

    // #SW-AS-002
    it('should check asset history', async () => {
      await assetsPage.openHistory();
      await assetsPage.checkHistoryElement(0, { type: 'ASSET_CREATED' });
      await assetsPage.checkHistoryElement(1, { type: 'ASSET_OFFERED' });
      await assetsPage.checkHistoryElement(2, { type: 'ASSET_OFFER_CANCELED' });
      await waitForTimeout(1000);
      await assetsPage.closeDialog();
    });
  });

  describe('Governance', () => {
    beforeAll(async () => {
      governancePage = new GovernancePage();
      await governancePage.goTo();
      await governancePage.waitForLoaderDisappear();
    });

    //  #SW-GO-010
    it('should check details of organization', async () => {
      await waitForTimeout(1000);
      await governancePage.openDetails();
      await governancePage.checkDetails({
        namespace: 'suborg.dawidgil.iam.ewc',
        name: 'Org',
        type: 'Organization Namespace',
      });
      await waitForTimeout(500);
      await governancePage.closeDialog();
    });

    // #SW-GO-003
    it('should create role', async () => {
      await governancePage.openCreateRole();
      await governancePage.createRole({
        roleName: new Date(Date.now()).getTime().toString(),
        issuerRole: 'alldata.roles.gilsuborg.dawidgil.iam.ewc',
        validityPeriod: { years: 1, days: 12, hours: 3 },
      });
    });
  });

  afterAll(async () => {
    await page.close();
  });
});
