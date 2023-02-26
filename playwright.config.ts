import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
const ENV = process.env.ENV;

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./src/config/global-setup`,

  //Global Teardown to run after all tests
  globalTeardown: `./src/config/global-teardown`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [[`html`, { outputFolder: 'html-report', open: 'never' }]],

  projects: [
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      },
    },
  ],
};
export default config;
