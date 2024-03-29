import { fillInput, Selector, waitForTimeout } from '../utils';
import { BaseAbstract } from './base.abstract';
import { Dialog } from './dialog';

export class DidBookPage extends BaseAbstract {
  private readonly INPUT_LABEL = 'label';
  private readonly INPUT_DID = 'did';
  private readonly ADD_BUTTON = 'add';
  private readonly CANCEL_BUTTON = 'cancel';
  private readonly INPUT_FILTER_DID = 'filter-did';
  private readonly HOST = 'app-did-book';
  private readonly REMOVE_RECORD = 'remove-';
  private dialog = new Dialog();

  /**
   * This property is generated depending on actual local timestamp. It's the easiest way to make it unique.
   */
  private RANDOM_LABEL: string = new Date(Date.now()).getTime().toString();

  async waitForLoad() {
    await page.waitForSelector(this.HOST);
    await waitForTimeout(100);
  }

  async setLabel(value?: string): Promise<void> {
    if (value && value !== this.RANDOM_LABEL) {
      this.RANDOM_LABEL = value;
    }
    await fillInput(this.RANDOM_LABEL, Selector.byQaId(this.INPUT_LABEL));
  }

  async setDID(value: string) {
    await fillInput(value, Selector.byQaId(this.INPUT_DID));
  }

  async findDID() {
    await fillInput(this.RANDOM_LABEL, Selector.byQaId(this.INPUT_FILTER_DID));
  }

  async amountOfRecords(amount: number): Promise<void> {
    const rows = await page.$$eval('tbody tr', (elements) => elements.length);
    expect(rows).toEqual(amount);
  }

  async isAddDisabled() {
    const isAddButtonDisabled = page.waitForSelector(
      `${Selector.byQaId(this.ADD_BUTTON)}[disabled]`
    );

    expect(isAddButtonDisabled).toBeFalsy();
  }

  async addRecord() {
    const addButton = await page.waitForSelector(
      `${Selector.byQaId(this.ADD_BUTTON)}`
    );
    await addButton.click();
  }

  async addButtonIsEnabled() {
    const addButton = await page.waitForSelector(
      `${Selector.byQaId(this.ADD_BUTTON)}:not([disabled])`
    );
    expect(addButton).toBeTruthy();
  }

  async removeRecord(record: number) {
    await (
      await page.waitForSelector(
        `${Selector.byQaId(this.REMOVE_RECORD + record)}`
      )
    ).click();
  }

  async close() {
    await this.snackbar.closeSnackbar();
    await waitForTimeout(2000);
    await this.dialog.close();
    await waitForTimeout(1000);
  }
}
