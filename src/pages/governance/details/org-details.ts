import { Selector } from '../../../utils/selector';
import { Comparator } from '../../../utils';

export class OrgDetails {
  protected readonly NAMESPACE = Selector.byQaId('namespace');
  protected readonly TYPE_NAMESPACE = Selector.byQaId('type-namespace');
  protected readonly NAME = Selector.byQaId('name');

  async compareNamespace(namespace: string) {
    await this.compare(namespace, this.NAMESPACE);
  }

  async compareNamespaceType(type: string) {
    await this.compare(type, this.TYPE_NAMESPACE);
  }

  async compareName(name: string) {
    await this.compare(name, this.NAME);
  }

  protected async compare(toCompare: string, selector: string) {
    await Comparator.compare(toCompare, selector, 'screenshots/errors/comparing.png')
  }
}
