import { BaseAbstract } from '../base.abstract';

export class DashboardComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = 'Enrolments';
  private readonly ASSETS_SELECTOR = 'Assets';
  private readonly GOVERNANCE_SELECTOR = 'Governance';

  async getAssetsCard(): Promise<void> {
    await page.$(this.getSelector(this.ASSETS_SELECTOR));
  }

  async getGovernanceCard(): Promise<void> {
    await page.$(this.getSelector(this.GOVERNANCE_SELECTOR));
  }

  async getEnrolmentsCard(): Promise<void> {
    await page.$(this.getSelector(this.ENROLMENT_SELECTOR));
  }
}
