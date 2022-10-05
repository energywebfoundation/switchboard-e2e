import { Selector } from '../../../utils/selector';

export abstract class DetailsBaseAbstract {
  protected readonly NAMESPACE = Selector.byQaId('namespace') ;
  protected readonly TYPE_NAMESPACE = Selector.byQaId('type-namespace') ;
  protected readonly NAME = Selector.byQaId('name') ;
}
