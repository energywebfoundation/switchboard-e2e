import { BaseAbstract } from '../base.abstract';

export class HeaderComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = 'header-enrolment';
  private readonly ASSETS_SELECTOR = 'header-assets';
  private readonly GOVERNANCE_SELECTOR = 'header-governance';

  private readonly USER_MENU_SELECTOR = 'user-menu';
  private readonly LOGOUT_SELECTOR = 'menu-logout';

  async openMenu() {
    await page.click(this.getSelector(this.USER_MENU_SELECTOR));
  }

  async logout() {
    await page.click(this.getSelector(this.LOGOUT_SELECTOR));
  }

  async getMenu() {
    return await page.waitForSelector(this.getSelector(this.USER_MENU_SELECTOR));
  }

  async getLogoutButton() {
    return await page.$(this.getSelector('menu-logout'));
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
