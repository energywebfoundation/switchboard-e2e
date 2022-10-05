import { BaseAbstract } from '../base.abstract';
import { Selector } from '../../utils/selector';
import { waitForTimeout } from '../../utils/wait-for-timeout';

export class HeaderComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = Selector.byQaId('header-enrolment');
  private readonly ASSETS_SELECTOR = Selector.byQaId('header-assets');
  private readonly GOVERNANCE_SELECTOR = Selector.byQaId('header-governance');

  private readonly USER_MENU_SELECTOR = Selector.byQaId('user-menu');
  private readonly LOGOUT_SELECTOR = Selector.byQaId('menu-logout');
  private readonly DID_BOOK_SELECTOR = Selector.byQaId('menu-did-book');

  async logout() {
    await page.click(this.LOGOUT_SELECTOR);
  }

  getMenu() {
    return page.waitForSelector(this.USER_MENU_SELECTOR);
  }

  async openDIDBook() {
    await waitForTimeout(1000);
    await (await this.getMenu()).click();
    await waitForTimeout(1000);
    await page.click(this.DID_BOOK_SELECTOR);
    await waitForTimeout(100);
    expect(await page.$('app-did-book-form')).toBeTruthy();
  }

  async getLogoutButton() {
    return await page.$(this.LOGOUT_SELECTOR);
  }

  async isExperimentalEnabled(): Promise<boolean> {
    return Boolean(page.$(this.ASSETS_SELECTOR));
  }

  async navigateToAssets(): Promise<void> {
    await this.navigateTo(this.ASSETS_SELECTOR);
  }

  async navigateToGovernance(): Promise<void> {
    await this.navigateTo(this.GOVERNANCE_SELECTOR);
  }

  async navigateToEnrolments(): Promise<void> {
    await this.navigateTo(this.ENROLMENT_SELECTOR);
  }

  async navigateTo(selector: string) {
    await waitForTimeout(3000);
    await page.click(selector);
    await (await page.waitForSelector(`${selector} a`)).click();
  }
}
