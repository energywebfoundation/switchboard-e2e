import { Selector } from '../../utils/selector';
import { fillInput } from '../../utils/fill-input';

export class EditPage {
  private readonly NAME_INPUT = Selector.byQaId('name');
  private readonly ICON_INPUT = Selector.byQaId('icon');
  private readonly SAVE_BUTTON = Selector.byQaId('next');

  async editAssetWith(asset: {
    name: string;
    iconUrl?: string;
  }): Promise<void> {
    await page.waitForSelector(this.NAME_INPUT);

    await page.type(this.NAME_INPUT, asset.name);
    if (asset.iconUrl) {
      await fillInput(asset.iconUrl, this.ICON_INPUT);
    }

    await (await page.waitForSelector(this.SAVE_BUTTON)).click();
  }
}
