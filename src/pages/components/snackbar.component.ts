export class SnackbarComponent {
  private readonly CONTAINER = '#toast-container';
  private readonly ERROR = '.toast-container .toast-error';
  async closeSnackbar() {
    await (await page.waitForSelector(this.CONTAINER)).click();
  }

  isVisible() {
    return page.waitForSelector(this.CONTAINER);
  }

  isErrorVisible() {
    return page.waitForSelector(this.ERROR);
  }
}
