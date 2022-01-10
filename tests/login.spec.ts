import { Metamask } from '../src/metamask';
import { CONFIG } from '../src/config';
import { Page } from 'puppeteer';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Select } from '../src/select';

describe('login tests', () => {
  // let page: Page
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage();
    // await page.setViewport({width: 1024, height: 600, hasTouch: true});
    await page.goto(CONFIG.page, {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});

    await page.waitForTimeout(5000);

  });

  it('should display snackbar when rejecting metamask', async () => {
    const btn = await page.waitForSelector('.btn-connect-metamask');
    await btn.focus();
    await btn.click();

    const metamask = await getMetamaskWindow(browser);
    await metamask.page.reload();
    if(await metamask.page.$('[data-testid="popover-close"]')) {
      await metamask.page.click('[data-testid="popover-close"]');
    }

    await Metamask.reject();
    expect(await page.waitForSelector('.toast-container .toast-error')).toBeTruthy();
  });

  it('should successfully login and after logout navigate to welcome page', async () => {
    const btn = await page.waitForSelector('.btn-connect-metamask');
    await btn.focus();
    await btn.click();

    const metamask = await getMetamaskWindow(browser);
    const metamaskWindow = metamask.page;
    await metamask.page.reload();
    if(await metamask.page.$('[data-testid="popover-close"]')) {
      await metamask.page.click('[data-testid="popover-close"]');
    }
    await metamask.approve();

    await Metamask.sign(metamaskWindow);

    await page.bringToFront();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
    await page.evaluate(() => {
      localStorage.clear();
    });
    // expect(await page.waitForSelector('.btn-connect-metamask')).toBeTruthy();
  });

  xit('should switch network to volta', () => {

  });

  xit('should display dialog information when switching network', () => {

  });

  xit('should display dialog information when switching account', () => {

  });

  xit('should navigate to dashboard page, when refreshing page after successful login', () => {

  });


});
