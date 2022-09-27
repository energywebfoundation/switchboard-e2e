export const waitForTimeout = async (milliseconds: number) => {
  await page.waitForTimeout(milliseconds);
  // return new Promise(r => setTimeout(r, milliseconds));
};
