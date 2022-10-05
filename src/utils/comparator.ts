export class Comparator {
  static async compare(toCompare: string, selector: string, screenshotPath?: string) {
    try {
      await page.waitForSelector(selector);

      const element = await page.$(selector);
      const value = await page.evaluate(el => el.textContent, element);
      expect(toCompare.trim().toLowerCase()).toEqual(value.trim().toLowerCase());
    } catch (e) {
      await page.screenshot({path: screenshotPath || 'screenshots/errors/comparing.png'});
      throw e;
    }

  }
}
