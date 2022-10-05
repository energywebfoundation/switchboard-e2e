import { fillInput } from '../../../utils';
import { Selector } from '../../../utils';
import { waitForTimeout } from '../../../utils';

export class RoleName {
  private readonly ROLE_NAME_INPUT = Selector.byQaId('role-name');

  async setRoleName(roleName: string) {
    await page.waitForSelector(this.ROLE_NAME_INPUT);
    await waitForTimeout(1000);
    await fillInput(roleName, this.ROLE_NAME_INPUT);
  }
}
