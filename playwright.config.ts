import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { TRUTHYS } from '@utils/misc';

dotenv.config({ path: '.env' });

const isRecording = TRUTHYS.includes(process.env.RECORD_ALL) ? 'on' : 'retain-on-failure';
const saveTrace = TRUTHYS.includes(process.env.TRACE_ALL) ? 'on' : 'retain-on-failure';
const gl = process.env.USE_GL || '';
const useGL = gl.length ? `--use-gl=${gl}` : '';
const headless = TRUTHYS.includes(process.env.HEADLESS);
const slowMo = parseInt(process.env.SLOW_MO, 0) || 0;
const BROWSER_STATE = '.playwright/users/state.json';
const HEIGHT = 730;
const WIDTH = 900;

const config: PlaywrightTestConfig = {
  globalSetup: './src/config/global-setup.ts',
  globalTeardown: './src/config/global-teardown.ts',
  testMatch: /.*.[jt]s/,
  maxFailures: parseInt(process.env.MAX_FAILURES) || 5,
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: process.env.REPORT_PATH,
        open: 'never',
      },
    ],
  ],
  retries: parseInt(process.env.RETRIES),
  testDir: './executables/',
  timeout: parseInt(process.env.TIMEOUT),

  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless,
        viewport: { width: WIDTH, height: HEIGHT },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: isRecording,
        trace: saveTrace,
        storageState: BROWSER_STATE,
        launchOptions: {
          args: [
            useGL,
          ],
          slowMo,
        },
      },
    },
  ],
  expect: {
    timeout: parseInt(process.env.TIMEOUT),
  },
};
export default config;
