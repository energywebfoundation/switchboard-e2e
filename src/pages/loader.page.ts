import { Selector } from '../utils/selector';
import { LoaderSelectorEnum } from '../models';

export class LoaderPage {
  public async waitForLoaderDisappear() {
    try {
      if (!(await page.$(Selector.byQaId(LoaderSelectorEnum.Loader)))) {
        console.log('invisible');
      }
      if (await page.$(Selector.byQaId(LoaderSelectorEnum.Loader))) {
        console.log('visible');
        await page.waitForSelector(Selector.byQaId(LoaderSelectorEnum.Loader), {
          hidden: true,
          timeout: 30000,
        });
      }
    } catch (e) {
      await page.screenshot({ type: 'png' });
    }
  }

  async waitForPreloaderDisappear() {
    if (await page.$(LoaderSelectorEnum.PreLoader)) {
      await page.waitForSelector(LoaderSelectorEnum.PreLoader, {
        hidden: false,
      });
    }
  }
}
