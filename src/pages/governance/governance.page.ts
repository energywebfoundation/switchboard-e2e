import { BaseAbstract } from '../base.abstract';
import { HeaderComponent } from '../components/header.component';
import { TableActionsComponent } from '../components/table-actions.component';
import { RoleCreationPage } from './role-creation.page';
import { OrgDetails } from './details/org-details';
import { Dialog } from '../dialog/dialog';
import { Field } from './role-creation/fields';
import { Selector, waitForTimeout } from '../../utils';
import { Period } from './role-creation/validity-period';

interface RoleData {
  roleName: string;
  issuerRole?: string;
  issuerDIDs?: string[];
  revokerRole?: string;
  revokerDIDs?: string[];
  requesterFields?: Field[];
  issuerFields?: Field[];
  restrictions?: unknown;
  validityPeriod?: Period;
}

export class GovernancePage extends BaseAbstract {
  protected header: HeaderComponent = new HeaderComponent();
  private tableActions: TableActionsComponent = new TableActionsComponent();
  private orgDetails = new OrgDetails();
  private dialog = new Dialog();
  goTo() {
    return this.header.navigateToGovernance();
  }

  async openCreateRole(id: number = 0) {
    await this.tableActions.createRole(id);
    expect(await page.waitForSelector('app-new-role')).toBeTruthy();
  }

  async createRole(role: RoleData): Promise<void> {
    try {
      const roleCreation = new RoleCreationPage();

      await this.setRoleName(role, roleCreation);

      await waitForTimeout(1000);

      await this.setIssuer(role, roleCreation);

      await waitForTimeout(1000);

      await this.setRevoker(role, roleCreation);

      await waitForTimeout(1000);

      await this.setRestrictions(role, roleCreation);

      await waitForTimeout(1000);

      await this.setValidityPeriod(role.validityPeriod,
        roleCreation
      );

      await waitForTimeout(1000);

      await this.setRequesterFields(role, roleCreation);

      await waitForTimeout(1000);

      await this.setIssuerFields(role, roleCreation);

      await waitForTimeout(1000);

      // confirm details
      await this.confirmDetails();

      await this.metamaskPage.confirmTransaction({
        textContent: 'Contract Interaction',
        type: 'h2',
      });

      await this.metamaskPage.confirmTransaction({
        textContent: 'Unapproved',
        type: 'div',
      });

      await page.bringToFront();

      await roleCreation.complete();
    } catch (e) {
      await page.screenshot({ path: 'screenshots/errors/role-creation.png' });
      throw e;
    }
  }

  async openDetails(id: number = 0) {
    await this.tableActions.openDetails(id);
  }

  async checkDetails(data: { namespace: string; name: string; type: string }) {
    await this.orgDetails.compareNamespace(data.namespace);
    await this.orgDetails.compareName(data.name);
    await this.orgDetails.compareNamespaceType(data.type);
  }

  async closeDialog() {
    await this.dialog.close();
  }

  private async setRoleName(role: RoleData, roleCreation: RoleCreationPage) {
    await roleCreation.setRoleName(role.roleName);
    await (
      await page.waitForSelector(Selector.byQaId('proceed-role-name'))
    ).click();
  }

  private async setRevoker(role: RoleData, roleCreation: RoleCreationPage) {
    if (role.revokerRole) {
      await roleCreation.setRevokersRole(role.revokerRole);
    }

    if (role.revokerDIDs) {
      await roleCreation.setRevokersDIDs(role.revokerDIDs);
    }

    await (await page.waitForSelector(Selector.byQaId('next-revoker'))).click();
  }

  private async setIssuer(role: RoleData, roleCreation: RoleCreationPage) {
    if (role.issuerRole) {
      await roleCreation.setIssuerRole(role.issuerRole);
    }

    if (role.issuerDIDs) {
      await roleCreation.setIssuerDIDs(role.issuerDIDs);
    }

    await (await page.waitForSelector(Selector.byQaId('next-issuer'))).click();
  }

  private async setRestrictions(
    role: RoleData,
    roleCreation: RoleCreationPage
  ) {
    // TODO: implement handling restrictions
    if (role.restrictions) {
      // roleCreation.set
    }

    await (
      await page.waitForSelector(Selector.byQaId('next-restrictions'))
    ).click();
  }

  private async setValidityPeriod(
    period: Period,
    roleCreation: RoleCreationPage
  ) {
    await roleCreation.setValidityPeriod(period);
    await (await page.waitForSelector(Selector.byQaId('period-next'))).click();
  }
  private async setRequesterFields(
    role: RoleData,
    roleCreation: RoleCreationPage
  ) {
    if (role?.requesterFields?.length > 0) {
      await roleCreation.setRequesterFields(role.requesterFields);
    }

    await (
      await page.waitForSelector(Selector.byQaId('next-requestor-fields'))
    ).click();
  }
  private async setIssuerFields(
    role: RoleData,
    roleCreation: RoleCreationPage
  ) {
    if (role?.issuerFields?.length > 0) {
      await roleCreation.setIssuerFields(role.issuerFields);
    }

    await (
      await page.waitForSelector(Selector.byQaId('next-issuer-fields'))
    ).click();
  }

  private async confirmDetails() {
    await (
      await page.waitForSelector(Selector.byQaId('confirm-details'))
    ).click();
  }
}
