export abstract class BaseAbstract {
  protected getSelector(attribute: string): string {
    return `[data-qa-id="${attribute}"]`;
  }
}
