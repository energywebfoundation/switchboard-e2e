import { Selector } from '../utils/selector';
import { fillInput } from '../utils/fill-input';

export class TransferOwnershipPage {
  private readonly SUBMIT_TRANSFER_BUTTON = Selector.byQaId('next');
  private readonly COMPLETE_TRANSFER = Selector.byQaId('complete');

  private readonly TRANSFER_DID_INPUT = Selector.byQaId('did-input');
  private readonly CONFIRM_TRANSACTION = Selector.byQaId('confirm');
  private readonly CANCEL_TRANSACTION = Selector.byQaId('cancel');

  async setDID(did: string): Promise<void> {
    const inputValue = did.startsWith('did:ethr:volta:')
      ? did
      : 'did:ethr:volta:' + did;
    await page.waitForSelector(this.TRANSFER_DID_INPUT);
    await fillInput(inputValue, this.TRANSFER_DID_INPUT);
  }

  async send() {
    await (await page.waitForSelector(this.SUBMIT_TRANSFER_BUTTON)).click();
  }

  async complete() {
    expect(await page.waitForSelector(this.COMPLETE_TRANSFER)).toBeTruthy();
    await (await page.waitForSelector(this.COMPLETE_TRANSFER)).click();
  }

  async confirmPopup() {
    await (await page.waitForSelector(this.CONFIRM_TRANSACTION)).click();
  }

  async cancel() {
    await (await page.waitForSelector(this.CANCEL_TRANSACTION)).click();
  }
}
