export class Dialog {
  private readonly CLOSE = 'h4.mat-dialog-title button';

  async close() {
    const closeButton = await page.$(this.CLOSE);
    if (closeButton) {
      await closeButton.click();
    }
  }
}
