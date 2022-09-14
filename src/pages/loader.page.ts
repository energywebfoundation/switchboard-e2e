import { Selector } from '../utils/selector';
import { LoaderSelectorEnum, MetamaskSelector } from '../models';

export class LoaderPage {
  public async waitForLoaderDisappear() {
    await page.waitForSelector(Selector.byQaId(LoaderSelectorEnum.Loader), {
      hidden: true,
      timeout: 30000,
    });
  }

  async waitForPreloaderDisappear() {
    if (await page.$(LoaderSelectorEnum.PreLoader)) {
      await page.waitForSelector(LoaderSelectorEnum.PreLoader, { hidden: false });
    }
  }
}
