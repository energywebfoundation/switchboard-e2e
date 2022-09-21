import { MetamaskPage } from '../../src/pages/metamask.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login } from '../../src/utils';
import { AssetPage } from '../../src/pages/asset.page';
import { RouterPathEnum } from '../../src/models/router-path.enum';
import { CONFIG } from '../../src/config';

describe('Assets tests', () => {
  let metamaskPage: MetamaskPage;
  let dashboardPage: DashboardPage;
  let login: Login;
  let assetsPage: AssetPage;

  beforeAll(async () => {
    (global as any)['page'] = await browser.newPage();
    metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
    login = await new Login(metamaskPage);
    await login.reinitializeIfNeeded(RouterPathEnum.Assets);

    dashboardPage = new DashboardPage();

    assetsPage = new AssetPage();
  });

  afterAll(async () => {
    await page.close();
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
