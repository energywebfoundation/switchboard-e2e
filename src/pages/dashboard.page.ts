import { HeaderComponent } from './components/header.component';
import { DashboardComponent } from './components/dashboard.component';
import { BaseAbstract } from './base.abstract';
import { waitForTimeout } from '../utils/wait-for-timeout';

export class DashboardPage extends BaseAbstract {
  header: HeaderComponent = new HeaderComponent();
  dashboard: DashboardComponent = new DashboardComponent();

  async isVisible() {
    expect(await this.dashboard.getGovernanceCard()).toBeTruthy();
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
