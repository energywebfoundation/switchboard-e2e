import { MetamaskPage } from '../../src/pages/metamask.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Login } from '../../src/utils';
import { AssetPage } from '../../src/pages/asset.page';
import { RouterPathEnum } from '../../src/models/router-path.enum';

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

    await assetsPage.editIconWith({name: 'Test name', iconUrl: 'https://fajnepodroze.pl/wp-content/uploads/2020/04/gil.jpg'});
    await page.waitForTimeout(15000);
  });

  it('should transfer created asset to different DID', async () => {});
});
