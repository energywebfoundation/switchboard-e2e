module.exports = {
  preset: '@chainsafe/dappeteer',
  testMatch: ['**/login.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'dist'], //
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globalSetup: './setup.js', // will be called once before all tests are executed
  globalTeardown: './teardown.js', // will be called once after all tests are executed,
  testEnvironment: './environment.js',
  testTimeout: 60000,
};
