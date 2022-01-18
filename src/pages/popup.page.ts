export class PopupPage {
  async isDisplayed() {
    expect(await page.waitForSelector('.swal-modal')).toBeTruthy();
  }
}
