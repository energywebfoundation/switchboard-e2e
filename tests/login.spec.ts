import { Metamask } from '../src/metamask';
import { CONFIG } from '../src/config';
import { Page } from 'puppeteer';
import { getMetamaskWindow } from '@chainsafe/dappeteer';

describe('login tests', () => {
  let page: Page
  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto(CONFIG.page, {waitUntil: ['load' , 'domcontentloaded' , 'networkidle0' , 'networkidle2']});
  })

  test('should login to switchboard', async () => {
    await page.waitForTimeout(5000);
    const btn = await page.waitForSelector('.btn-connect-metamask');
    console.log(btn);
    await btn.focus();
    await btn.click();

    const metamask = await getMetamaskWindow(browser);
    await metamask.approve();

    // const popover = await metamaskWindow.waitForSelector('[data-testid="popover-close"]');
    // await popover.click();
    // console.log('popover-close');
    // const button2 = await metamaskWindow.waitForSelector('[data-testid="home__activity-tab"]');
    // await button2.click();
    //
    // const unconfirmed = await metamaskWindow.waitForSelector('.transaction-list-item--unconfirmed');
    // await unconfirmed.click();
    //
    // const sign = await metamaskWindow.waitForSelector('[data-testid="request-signature__sign"]');
    // await sign.click();
    //
    // await page.bringToFront();
    await page.waitForTimeout(10000);
  });
});
