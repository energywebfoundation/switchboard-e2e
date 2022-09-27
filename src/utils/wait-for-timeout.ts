export const waitForTimeout = async (milliseconds: number) => {
  new Promise(r => setTimeout(r, milliseconds));
}
