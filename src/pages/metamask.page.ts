import { Page } from 'puppeteer';
import { MetamaskSelector } from '../models/metamask-selector.enum';

export class MetamaskPage {

  constructor(private page: Page) {
  }

  async closePopOver() {
    await this.bringToFrontAndReload();
    if (await this.page.$(this.getByTestId(MetamaskSelector.PopoverClose))) {
      await this.page.click(this.getByTestId(MetamaskSelector.PopoverClose));
    }
  }

  async bringToFrontAndReload() {
    await this.page.bringToFront();
    await this.page.reload();
  }

  async reject() {
    await this.closePopOver();

    await (await this.page.waitForSelector(MetamaskSelector.CancelButton)).click();
  }

  private getByTestId(attribute: string): string {
    return `[data-testid="${attribute}"]`;
  }
}
