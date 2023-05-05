import type { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto('https://www.strava.com');
  }

  async loginToApplication(): Promise<void> {
    await this.page.click('[data-cy="login_btn"]');
  }
}
