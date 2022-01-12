export abstract class BaseAbstract {

  public async waitForLoaderDisappear() {
    await page.waitForSelector(this.getSelector('loading'), {hidden: true});
  }

  protected getSelector(attribute: string): string {
    return `[data-qa-id="${attribute}"]`;
  }
}
