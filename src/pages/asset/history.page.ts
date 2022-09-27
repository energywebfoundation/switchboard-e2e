import { Selector } from '../../utils/selector';

export class HistoryPage {
  private readonly HISTORY_ITEM = (id: number) =>
    Selector.byQaId('history-item-' + id);
  private readonly EMITTED_DATE = Selector.byQaId('emitted-date');
  private readonly TYPE = Selector.byQaId('type');

  async checkType(id: number, type: string) {
    const element = await page.waitForSelector(
      `${this.HISTORY_ITEM(id)} ${this.TYPE}`
    );

    expect(await element.evaluate((el) => el.textContent)).toEqual(type);
  }

  async checkEmittedDate(id: number, date: string) {
    const element = await page.waitForSelector(
      `${this.HISTORY_ITEM(id)} ${this.EMITTED_DATE}`
    );

    expect(await element.evaluate((el) => el.textContent)).toEqual(date);
  }
}
