// import { MetamaskPage } from '../../src/pages/metamask.page';
// import { DashboardPage } from '../../src/pages/dashboard.page';
// import { getMetamaskWindow } from '@chainsafe/dappeteer';
// import { Login } from '../../src/utils';
// import { DidBookPage } from '../../src/pages/did-book.page';
// import { generateRandomDid } from '../../src/utils/generate-random-did';
//
// describe('DID Book tests', () => {
//   let metamaskPage: MetamaskPage;
//   let dashboardPage: DashboardPage;
//   let didBookPage: DidBookPage;
//   let  login: Login;
//
//   beforeAll(async () => {
//     (global as any)['page'] = await browser.newPage();
//     metamaskPage = new MetamaskPage(await getMetamaskWindow(browser));
//     login = await new Login(metamaskPage);
//     await login.reinitializeIfNeeded();
//
//     dashboardPage = new DashboardPage();
//
//     didBookPage = new DidBookPage();
//   });
//
//   afterAll(async () => {
//     await page.close();
//   });
//
//   it('should open DID Book, add new record and find it on the list and remove', async () => {
//     await dashboardPage.header.openDIDBook();
//
//     await didBookPage.waitForLoad();
//     await didBookPage.setLabel();
//     await didBookPage.setDID(generateRandomDid());
//     await didBookPage.addButtonIsEnabled();
//     await didBookPage.addRecord();
//
//     await dashboardPage.waitForLoaderDisappear();
//     await dashboardPage.closeSnackbar();
//   });
//
//   it('should remove record from list', async() => {
//     await page.waitForTimeout(3000);
//     await didBookPage.findDID();
//     await page.waitForTimeout(1000);
//
//     await didBookPage.amountOfRecords(1);
//
//     await page.waitForTimeout(1000);
//
//     await didBookPage.removeRecord(0);
//     await page.waitForTimeout(1000);
//     await didBookPage.amountOfRecords(0);
//   })
// });
