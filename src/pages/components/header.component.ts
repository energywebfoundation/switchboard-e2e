import { BaseAbstract } from '../base.abstract';

export class HeaderComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = 'header-enrolment';
  private readonly ASSETS_SELECTOR = 'header-assets';
  private readonly GOVERNANCE_SELECTOR = 'header-governance';

  async getMenu() {
    return await page.waitForSelector(this.getSelector('user-menu'));
  }

  async getLogoutButton() {
    return await page.waitForSelector(this.getSelector('menu-logout'));
  }

  async areNavigationButtonsVisible(): Promise<boolean> {
    return Boolean(page.$(this.getSelector(this.GOVERNANCE_SELECTOR)));
  }

  async isExperimentalEnabled(): Promise<boolean> {
    return Boolean(page.$(this.getSelector(this.ASSETS_SELECTOR)));
  }

  async navigateToAssets(): Promise<void> {
    await page.click(this.getSelector(this.ASSETS_SELECTOR));
  }

  async navigateToGovernance(): Promise<void> {
    await page.click(this.getSelector(this.GOVERNANCE_SELECTOR));
  }

  async navigateToEnrolments(): Promise<void> {
    await page.click(this.getSelector(this.ENROLMENT_SELECTOR));
  }
}