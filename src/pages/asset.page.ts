import { BaseAbstract } from './base.abstract';
import { HeaderComponent } from './components/header.component';
import { LoaderPage } from './loader.page';
import { Selector } from '../utils/selector';

export class AssetPage extends BaseAbstract {
  private readonly REGISTER_ASSET_BUTTON = Selector.byQaId('register-asset');
  private readonly DIALOG_REGISTER_ASSET_BUTTON = Selector.byQaId(
    'dialog-register-asset'
  );
  private readonly ACTIONS_MENU = (id: number) => Selector.byQaId('menu-' + id);
  private readonly EDIT_MENU_ACTION = Selector.byQaId('edit');
  private readonly NAME_INPUT = Selector.byQaId('name');
  private readonly ICON_INPUT = Selector.byQaId('icon');
  private readonly SAVE_BUTTON = Selector.byQaId('next');

  header: HeaderComponent = new HeaderComponent();
  loader: LoaderPage = new LoaderPage();

  async isMyAssetPageVisible() {
    expect(
      await page.waitForSelector(this.REGISTER_ASSET_BUTTON, { visible: true })
    );
  }

  async goToAssets() {
    await this.loader.waitForLoaderDisappear();
    await page.waitForTimeout(1000);
    await this.header.navigateToAssets();
    await this.loader.waitForLoaderDisappear();
    await this.isMyAssetPageVisible();
  }

  async registerAsset() {
    await page.waitForTimeout(1000);
    await (await page.waitForSelector(this.REGISTER_ASSET_BUTTON)).click();
    await page.waitForTimeout(1000);
    await (
      await page.waitForSelector(this.DIALOG_REGISTER_ASSET_BUTTON)
    ).click();
    console.log('register clicked');
    await this.metamaskPage.confirmTransaction();
    await page.waitForTimeout(1000);
    await this.loader.waitForLoaderDisappear();
    expect(await this.snackbar.isVisible).toBeTruthy();
  }

  async openEditAction(id: number = 0): Promise<void> {
    await (await page.waitForSelector(this.ACTIONS_MENU(id))).click();
    await page.waitForTimeout(1000);
    await (await page.waitForSelector(this.EDIT_MENU_ACTION)).click();
    expect(await page.waitForSelector('app-edit-asset-dialog')).toBeTruthy();
  }

  async editIconWith(asset: { name: string; iconUrl?: string }): Promise<void> {
    await page.waitForSelector(this.NAME_INPUT);

    await page.type(this.NAME_INPUT, asset.name);
    if (asset.iconUrl) {
      await page.type(this.ICON_INPUT, asset.iconUrl);
    }

    await (await page.waitForSelector(this.SAVE_BUTTON)).click();
    await this.metamaskPage.sign();
    await this.metamaskPage.confirmTransaction();
    await this.loader.waitForLoaderDisappear();
  }
}
