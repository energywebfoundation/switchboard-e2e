import { Selector } from '../../../utils/selector';
import { fillInput } from '../../../utils/fill-input';

export class RoleIssuerRevoker {
  private readonly DROPDOWN = Selector.byQaId('select-type');
  private readonly ROLE_NAMESPACE = Selector.byQaId('smart-search-input');
  private readonly CLEAR_ROLE_NAMESPACE = Selector.byQaId('clear');
  private readonly DID_INPUT = Selector.byQaId('did-input');
  private readonly ADD_DID_BUTTON = Selector.byQaId('add-did');

  async pickType(type: 'DID' | 'ROLE') {
    const dropdown = await page.waitForSelector(this.DROPDOWN);
    await dropdown.click();

    const option = await page.waitForSelector(Selector.byQaId(type));
    await option.click();
  }

  async setRole(role: string) {
    await page.waitForSelector(this.ROLE_NAMESPACE);

    await fillInput(role, this.ROLE_NAMESPACE);
  }

  async setDID(did: string) {
    await page.waitForSelector(this.DID_INPUT);

    await fillInput(did, this.DID_INPUT);
    const addButton = await page.waitForSelector(this.ADD_DID_BUTTON);
    await addButton.click();
  }

  async clearRole() {
    const clear = await page.waitForSelector(this.CLEAR_ROLE_NAMESPACE);
    await clear.click();
  }
}
