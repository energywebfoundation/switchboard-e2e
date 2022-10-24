import { DashboardComponent, HeaderComponent } from './components';
import { BaseAbstract } from './base.abstract';
import { waitForTimeout } from '../utils';

export class DashboardPage extends BaseAbstract {
  header: HeaderComponent = new HeaderComponent();
  dashboard: DashboardComponent = new DashboardComponent();

  async isVisible() {
    return await this.dashboard.getGovernanceCard();
  }

  async rejectMetamaskWhenReinitializing() {
    await this.metamaskPage.reject();
    await page.bringToFront();
  }

  async logout() {
    await this.waitForLoaderDisappear();

    expect(await this.header.getMenu()).toBeTruthy();
    await (await this.header.getMenu()).click();
    await waitForTimeout(1000);
    expect(await this.header.getLogoutButton()).toBeTruthy();
    await (await this.header.getLogoutButton()).click();
  }
}
