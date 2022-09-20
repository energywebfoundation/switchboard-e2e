export const fillInput = async (value: string, selector: string) => {
  await page.click(selector, { delay: 100 });
  await page.keyboard.press('Backspace');
  await page.type(selector, value);
}
