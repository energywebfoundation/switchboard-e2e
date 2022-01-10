import { Metamask } from '../src/metamask';
import { CONFIG } from '../src/config';
import { Page } from 'puppeteer';
import { getMetamaskWindow } from '@chainsafe/dappeteer';
import { Select } from '../src/select';

describe('login tests', () => {
  // let page: Page
  beforeEach(async () => {
    (global as any)['page'] = await browser.newPage()
    await page.goto(CONFIG.page, {waitUntil: ['load' , 'domcontentloaded' , 'networkidle0' , 'networkidle2']});
  })

  it('should successfully login and after logout navigate to welcome page', async () => {
    await page.waitForTimeout(5000);
    const btn = await page.waitForSelector('.btn-connect-metamask');
    await btn.focus();
    await btn.click();

    const metamask = await getMetamaskWindow(browser);
    const metamaskWindow = metamask.page;
    await metamask.page.reload();


    // TODO: check how to move forward when popup will be displayed in metamask.
    // const popover2 = await metamask.page.$('.fas.fa-times.popover-header__button');
    //
    // if (popover2) {
    //   await popover2.click();
    // }

    await metamask.approve();

    await Metamask.sign(metamaskWindow);

    await page.bringToFront();
    expect((await Select.byQaData('Governance'))).toBeTruthy();
  });

  it('should display snackbar when rejecting metamask', () => {

  });

  it('should switch network to volta', () => {

  });

  it('should display dialog information when switching network', () => {

  });

  it('should display dialog information when switching account', () => {

  });

  it('should navigate to dashboard page, when refreshing page after successful login', () => {

  })


});
