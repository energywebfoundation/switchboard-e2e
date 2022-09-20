import { Selector } from '../../utils/selector';

export class HistoryPage {
  private readonly HISTORY_ITEM = (id: number) =>
    Selector.byQaId('history-item-' + id);
  private readonly EMITTED_DATE = Selector.byQaId('emitted-date');
  private readonly TYPE = Selector.byQaId('type');
}
