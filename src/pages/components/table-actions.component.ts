import { Selector } from '../../utils/selector';

export class TableActionsComponent {
  private readonly ACTIONS_MENU = (id: number) => Selector.byQaId('menu-' + id);
  private readonly EDIT_MENU_ACTION = Selector.byQaId('edit');
  private readonly TRANSFER_OWNERSHIP_BUTTON =
    Selector.byQaId('transfer-ownership');
  private readonly CANCEL_TRANSFER_BUTTON =
    Selector.byQaId('cancel-transfer');
  private readonly SHOW_HISTORY = Selector.byQaId('history');

  async openEditAction(id: number): Promise<void> {
    await this.openAction(id, this.EDIT_MENU_ACTION);
  }

  async openTransferAction(id: number): Promise<void> {
    await this.openAction(id, this.TRANSFER_OWNERSHIP_BUTTON);
  }

  async cancelTransfer(id: number): Promise<void> {
    await this.openAction(id, this.CANCEL_TRANSFER_BUTTON);
  }

  async openHistory(id: number): Promise<void> {
    await this.openAction(id, this.SHOW_HISTORY);
  }

  private async openAction(id: number, selector: string) {
    await (await page.waitForSelector(this.ACTIONS_MENU(id))).click();
    await page.waitForTimeout(1000);
    await (await page.waitForSelector(selector)).click();
  }
}
