export class Dialog {
  private readonly CLOSE = 'h4.mat-dialog-title button';

  async close() {
    const closeButton = await page.waitForSelector(this.CLOSE);
    await closeButton.click();
  }
}
