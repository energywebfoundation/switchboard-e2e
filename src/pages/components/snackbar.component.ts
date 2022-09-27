export class SnackbarComponent {
  private readonly CONTAINER = '#toast-container';
  async closeSnackbar() {
    await (await page.waitForSelector(this.CONTAINER)).click();
  }

  isVisible() {
    page.waitForSelector(this.CONTAINER);
  }
}
