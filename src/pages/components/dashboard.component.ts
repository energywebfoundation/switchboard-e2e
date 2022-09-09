import { BaseAbstract } from '../base.abstract';
import { ElementHandle } from 'puppeteer';
import { Selector } from '../../utils/selector';

export class DashboardComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = 'Enrolments';
  private readonly ASSETS_SELECTOR = 'Assets';
  private readonly GOVERNANCE_SELECTOR = 'Governance';

  async getAssetsCard(): Promise<void> {
    await page.$(Selector.byQaId(this.ASSETS_SELECTOR));
  }

  async getGovernanceCard(): Promise<ElementHandle<Element>> {
    return await page.waitForSelector(
      Selector.byQaId(this.GOVERNANCE_SELECTOR)
    );
  }

  async getEnrolmentsCard(): Promise<void> {
    await page.$(Selector.byQaId(this.ENROLMENT_SELECTOR));
  }
}
