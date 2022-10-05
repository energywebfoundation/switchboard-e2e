import { BaseAbstract } from '../base.abstract';
import { HeaderComponent } from '../components/header.component';
import { TableActionsComponent } from '../components/table-actions.component';
import { RoleCreationPage } from './role-creation.page';
import { OrgDetails } from './details/org-details';
import { Dialog } from '../dialog/dialog';
import { Field } from './role-creation/fields';
import { Selector, waitForTimeout } from '../../utils';
import { getElementByContent } from '@chainsafe/dappeteer/dist/helpers';

interface RoleData {
  roleName: string;
  issuerRole?: string;
  issuerDIDs?: string[];
  revokerRole?: string;
  revokerDIDs?: string[];
  requesterFields?: Field[];
  issuerFields?: Field[];
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

  async createRole(role: RoleData) {
    try {
      const roleCreation = new RoleCreationPage();
      await roleCreation.setRoleName(role.roleName);
      await (await page.waitForSelector(Selector.byQaId('proceed-role-name'))).click();
      await waitForTimeout(1000);

      if (role.issuerRole) {
        await roleCreation.setIssuerRole(role.issuerRole);
      }

      if (role.issuerDIDs) {
        await roleCreation.setIssuerDIDs(role.issuerDIDs);
      }

      await (await page.waitForSelector(Selector.byQaId('next-issuer'))).click();
      await waitForTimeout(1000);

      if (role.revokerRole) {
        await roleCreation.setRevokersRole(role.revokerRole);
      }

      if (role.revokerDIDs) {
        await roleCreation.setRevokersDIDs(role.revokerDIDs);
      }

      await (await page.waitForSelector(Selector.byQaId('next-revoker'))).click();
      await waitForTimeout(1000);

      // omit preconditions
      await (await page.waitForSelector(Selector.byQaId('next-restrictions'))).click();
      await waitForTimeout(1000);

      await roleCreation.setValidityPeriod({years: 1, days: 12, hours: 3});
      await (await page.waitForSelector(Selector.byQaId('period-next'))).click();
      await waitForTimeout(1000);

      if (role?.requesterFields?.length > 0 ) {
        await roleCreation.setRequesterFields(role.requesterFields);
      }

      await (await page.waitForSelector(Selector.byQaId('next-requestor-fields'))).click();
      await waitForTimeout(1000);

      if (role?.issuerFields?.length > 0) {
        await roleCreation.setIssuerFields(role.issuerFields);
      }

      await (await page.waitForSelector(Selector.byQaId('next-issuer-fields'))).click();
      await waitForTimeout(1000);

      // confirm details
      await (await page.waitForSelector(Selector.byQaId('confirm-details'))).click();

      await this.metamaskPage.confirmTransaction({textContent: 'Contract Interaction', type: 'h2'});

      await this.metamaskPage.confirmTransaction({textContent: 'Unapproved', type: 'div'});

      await page.bringToFront();

      await roleCreation.complete();
    } catch (e) {
      await page.screenshot({path: 'screenshots/errors/role-creation.png'});
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
}
