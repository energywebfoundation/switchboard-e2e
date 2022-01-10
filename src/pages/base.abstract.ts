export class BaseAbstract {

  protected getByTestId(attribute: string): string {
    return `[data-testid="${attribute}"]`;
  }
}
