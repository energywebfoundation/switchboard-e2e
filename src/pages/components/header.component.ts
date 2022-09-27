import { BaseAbstract } from '../base.abstract';
import { Selector } from '../../utils/selector';
import { waitForTimeout } from '../../utils/wait-for-timeout';

export class HeaderComponent extends BaseAbstract {
  private readonly ENROLMENT_SELECTOR = 'header-enrolment';
  private readonly ASSETS_SELECTOR = 'header-assets';
  private readonly GOVERNANCE_SELECTOR = 'header-governance';

  private readonly USER_MENU_SELECTOR = 'user-menu';
  private readonly LOGOUT_SELECTOR = 'menu-logout';
  private readonly DID_BOOK_SELECTOR = 'menu-did-book';

  async openMenu() {
    await page.click(Selector.byQaId(this.USER_MENU_SELECTOR));
  }

  async logout() {
    await page.click(Selector.byQaId(this.LOGOUT_SELECTOR));
  }

  getMenu() {
    return page.waitForSelector(Selector.byQaId(this.USER_MENU_SELECTOR));
  }

  async openDIDBook() {
    await waitForTimeout(1000);
    await (await this.getMenu()).click();
    await waitForTimeout(1000);
    await page.click(Selector.byQaId(this.DID_BOOK_SELECTOR));
    await waitForTimeout(100);
    expect(await page.$('app-did-book-form')).toBeTruthy();
  }

  async getLogoutButton() {
    return await page.$(Selector.byQaId('menu-logout'));
  }

  async areNavigationButtonsVisible(): Promise<boolean> {
    return Boolean(page.$(Selector.byQaId(this.GOVERNANCE_SELECTOR)));
  }

  async isExperimentalEnabled(): Promise<boolean> {
    return Boolean(page.$(Selector.byQaId(this.ASSETS_SELECTOR)));
  }

  async navigateToAssets(): Promise<void> {
    await waitForTimeout(3000);
    await page.click(Selector.byQaId(this.ASSETS_SELECTOR));
    await (
      await page.waitForSelector(`${Selector.byQaId(this.ASSETS_SELECTOR)} a`)
    ).click();
  }

  async navigateToGovernance(): Promise<void> {
    await page.click(Selector.byQaId(this.GOVERNANCE_SELECTOR));
  }

  async navigateToEnrolments(): Promise<void> {
    await page.click(Selector.byQaId(this.ENROLMENT_SELECTOR));
  }
}
