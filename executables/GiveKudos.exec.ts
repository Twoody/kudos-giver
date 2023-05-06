import { test, expect } from '@playwright/test';
import { stravaUser } from '@interfaces';

test('sanity ', async ({ page }) => {
  await page.goto('https://www.strava.com/login');
  await page.getByPlaceholder('Your Email').fill(stravaUser.email);
  await page.getByPlaceholder('Password').fill(stravaUser.password);
  console.info('Login: Auth request sent');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Make sure auth is good, and then make sure 20 entries are on the page
  await expect(page).toHaveURL('https://www.strava.com/dashboard');
  console.info('Login: Complete');
  await page.goto('https://www.strava.com/dashboard?num_entries=20');
  console.info('Navigate: Ensuring 20 entries');

  // Get the current users name
  const userName = await page.locator('div.athlete-name').textContent();

  // Make sure all of the entries are loaded
  for (let i = 0; i < 19; i += 1) {
    await page.locator(`[data-testid="kudos_button"] >> nth=${i + 1}`).scrollIntoViewIfNeeded();
  }

  // Get all of the entries that do not have the current users name
  // (one cannot give themselves kudos, but the DTI is the same and blocks further iterations)
  const targets = await page.locator('[data-testid="web-feed-entry"]')
    .filter({ hasNot: page.locator(`[data-testid="owners-name"]:has-text("${userName}")`) });
  const allUnfilled = await targets.getByTestId('unfilled_kudos');
  const count = await allUnfilled.count();
  console.info(`Found: ${count} kudos to give`);
  for (let i = 0; i < count; i += 1) {
    await allUnfilled.nth(i).click();
    console.info(`\tKudo: Gave out kudo number ${i + 1}`);
  }
});
