import { BaseAbstract } from './base.abstract';
import { HeaderComponent } from './components/header.component';
import { Selector } from '../utils/selector';
import { TableActionsComponent } from './components/table-actions.component';
import { EditPage } from './asset/edit.page';
import { TransferOwnershipPage } from './transfer-ownership.page';
import { HistoryPage } from './asset/history.page';
import { waitForTimeout } from '../utils/wait-for-timeout';

export class AssetPage extends BaseAbstract {
  private readonly REGISTER_ASSET_BUTTON = Selector.byQaId('register-asset');
  private readonly DIALOG_REGISTER_ASSET_BUTTON = Selector.byQaId(
    'dialog-register-asset'
  );

  private header: HeaderComponent = new HeaderComponent();
  private tableActions: TableActionsComponent = new TableActionsComponent();
  private editPage: EditPage = new EditPage();
  private transferOwnership: TransferOwnershipPage =
    new TransferOwnershipPage();
  private ownershipHistory: HistoryPage = new HistoryPage();

  async isMyAssetPageVisible() {
    expect(
      await page.waitForSelector(this.REGISTER_ASSET_BUTTON, { visible: true })
    );
  }

  async goToAssets() {
    await waitForTimeout(1000);
    await this.header.navigateToAssets();
    await this.loader.waitForLoaderDisappear();
    await this.isMyAssetPageVisible();
  }

  async registerAsset() {
    await waitForTimeout(2000);
    await (await page.waitForSelector(this.REGISTER_ASSET_BUTTON)).click();
    await waitForTimeout(1000);
    await (
      await page.waitForSelector(this.DIALOG_REGISTER_ASSET_BUTTON)
    ).click();
    await this.metamaskPage.confirmTransaction();
    await waitForTimeout(1000);
    await this.loader.waitForLoaderDisappear();
    expect(await this.snackbar.isVisible).toBeTruthy();
  }

  async openEditAction(id: number = 0): Promise<void> {
    await this.tableActions.openEditAction(id);
    expect(await page.waitForSelector('app-edit-asset-dialog')).toBeTruthy();
  }

  async openTransferAction(id: number = 0): Promise<void> {
    await this.tableActions.openTransferAction(id);
  }

  async openHistory(id: number = 0): Promise<void> {
    await this.tableActions.openHistory(id);
  }

  async checkHistoryElement(
    id: number,
    element: { type: string; emittedDate?: string }
  ) {
    await this.ownershipHistory.checkType(id, element.type);
    if (element.emittedDate) {
      await this.ownershipHistory.checkEmittedDate(id, element.emittedDate);
    }
  }

  async cancelTransferAction(id: number = 0): Promise<void> {
    await this.tableActions.cancelTransfer(id);
  }

  async confirmCancel(): Promise<void> {
    await this.transferOwnership.confirmPopup();

    await this.confirmMetamaskTransaction();
  }

  private async confirmMetamaskTransaction(): Promise<void> {
    await this.metamaskPage.confirmTransaction();
    await this.loader.waitForLoaderDisappear();
  }

  async editAsset(asset: { name: string; iconUrl?: string }): Promise<void> {
    await this.editPage.editAssetWith(asset);
    await this.metamaskPage.sign();
    await this.metamaskPage.confirmTransaction();
    await this.loader.waitForLoaderDisappear();
  }

  async transferOwnershipTo(did: string) {
    await this.transferOwnership.setDID(did);
    await this.transferOwnership.send();
    await this.transferOwnership.confirmPopup();
    await this.confirmMetamaskTransaction();
  }
}
