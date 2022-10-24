import { Selector } from '../../utils/selector';
import { RoleName } from './role-creation/role-name';
import { RoleIssuerRevoker } from './role-creation/role-issuer-revoker';
import { Period, ValidityPeriod } from './role-creation/validity-period';
import { Field, Fields } from './role-creation/fields';
import { waitForTimeout } from '../../utils';

export class RoleCreationPage {
  private readonly NEXT_BUTTON = Selector.byQaId('next');
  private readonly PROCEED_BUTTON = Selector.byQaId('proceed');
  private readonly COMPLETE_BUTTON = Selector.byQaId('complete');

  async setRoleName(name: string) {
    const roleName = new RoleName();
    await roleName.setRoleName(name);
  }

  async proceed() {
    await (await page.waitForSelector(this.PROCEED_BUTTON)).click();
    await waitForTimeout(1000);
  }

  async next() {
    await (
      await page.waitForSelector(this.NEXT_BUTTON, { visible: true })
    ).click();
    await waitForTimeout(1000);
  }

  async complete() {
    await (await page.waitForSelector(`${this.COMPLETE_BUTTON}`)).click();
  }

  async setIssuerRole(role: string) {
    await this.setRole(role);
  }

  async setRevokersRole(role: string) {
    await this.setRole(role);
  }

  async setRevokersDIDs(dids: string[]) {
    await this.setDIDs(dids);
  }

  async setIssuerDIDs(dids: string[]) {
    await this.setDIDs(dids);
  }

  async setValidityPeriod(period: Period) {
    const validityPeriod = new ValidityPeriod();
    await validityPeriod.setPeriod(period);
  }

  async setIssuerFields(fields: Field[]) {
    await this.setFields(fields);
  }

  async setRequesterFields(fields: Field[]) {
    await this.setFields(fields);
  }

  private async setDIDs(dids: string[]) {
    dids.map(async (did) => {
      await new RoleIssuerRevoker().setDID(did);
    });
  }

  private async setRole(role: string) {
    const issuerRole = new RoleIssuerRevoker();
    await issuerRole.pickType('ROLE');

    await issuerRole.setRole(role);
  }

  private async setFields(fields: Field[]) {
    const field = new Fields();

    fields.map(async (v) => field.addField(v));
  }
}
