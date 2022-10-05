import { fillInput, Selector } from '../../../utils';

export interface Field {
  type: 'text' | 'number' | 'date' | 'boolean';
  label: string;
}

export class Fields {
  private readonly SHOW_FIELD = Selector.byQaId('show-field');
  private readonly ADD_FIELD = Selector.byQaId('add-field');
  private readonly LABEL = Selector.byQaId('field-label');
  private readonly TYPE = Selector.byQaId('field-type');
  private readonly TEXT_OPTION = Selector.byQaId('text');
  private readonly NUMBER_OPTION = Selector.byQaId('number');
  private readonly DATE_OPTION = Selector.byQaId('date');
  private readonly BOOLEAN_OPTION = Selector.byQaId('boolean');

  async showField() {
    const showField = await page.waitForSelector(this.SHOW_FIELD);
    await showField.click();
  }

  async addField(field: Field) {
    await this.showField();

    await this.pickOption(field);

    await this.setLabel(field.label);

    const add = await page.waitForSelector(this.ADD_FIELD);
    await add.click();
  }

  async setLabel(label) {
    await page.waitForSelector(this.LABEL);
    await fillInput(label, this.LABEL);
  }

  async pickOption({ type }: Field) {
    const select = await page.waitForSelector(this.TYPE);
    await select.click();

    if (type === 'text') {
      await this.select(this.TEXT_OPTION);
    }
    if (type === 'number') {
      await this.select(this.NUMBER_OPTION);
    }
    if (type === 'boolean') {
      await this.select(this.BOOLEAN_OPTION);
    }
    if (type === 'date') {
      await this.select(this.DATE_OPTION);
    }
  }

  async select(selector: string) {
    const option = await page.waitForSelector(selector);
    await option.click();
  }
}
