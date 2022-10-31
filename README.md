# Switchboard end-to-end tests

## Overview

This project contains E2E tests that are testing entire IAM stack through Switchboard-dapp.
Project is running on top of [Puppeteer](https://pptr.dev/), [Jest](https://jestjs.io/),
[TypeScript](https://www.typescriptlang.org/) and library [dAppeteer](https://github.com/chainsafe/dappeteer).

Project is running automatically on GHA after merge to develop branch
in [Switchboard-dapp](https://github.com/energywebfoundation/switchboard-dapp/).
Tests are run on [Switchboard](https://switchboard-dev.energyweb.org/)

### Installing Dependencies

Use `npm` >= 7 to install dependencies.

```sh
npm install
```

## Tests

To run tests, call one of below commands

Run

```sh
npm run test:login
```

To test login (with metamask) to Switchboard-dapp or

```sh
npm run test:without-login
```

To run tests for checking Switchboard-dapp functionality on dev environment.

Tests are split, because it made them more stable.
Note: tests are click sensitive and will not execute if the Testing Chromium browser goes out of focus



