// setup.js

const {writeFile} = require('fs').promises;
const os = require('os');
const path = require('path');

const {launch, setupMetamask} = require('@chainsafe/dappeteer');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');

const {metamaskOptions, PUPPETEER_CONFIG} = require('./jest.config');
const {Metamask} = require("./src/metamask");

const DIR = path.join(os.tmpdir(), 'jest_dappeteer_global_setup');

module.exports = async function () {
  const browser = await launch(puppeteer, {...PUPPETEER_CONFIG, metamaskVersion: '10.1.1'});
  try {
    // await setupMetamask(browser, metamaskOptions);
    await Metamask.setup(browser, {
      seed: 'allow special exercise item pretty cliff fitness foam acquire about truth bone',
      password: '123456789'
    });
    global.browser = browser;
  } catch (error) {
    console.log(error);
    throw error;
  }

  mkdirp.sync(DIR);
  await writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
