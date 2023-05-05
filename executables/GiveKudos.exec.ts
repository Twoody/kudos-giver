import { test, expect } from '@playwright/test';
import { stravaUser } from '@interfaces';

test('sanity ', async ({ page }) => {
  await page.goto('https://www.strava.com/login');
  await page.getByPlaceholder('Your Email').fill(stravaUser.email);
  await page.getByPlaceholder('Password').fill(stravaUser.password);
  console.info('Login: Auth request sent');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page).toHaveURL('https://www.strava.com/dashboard');
  console.info('Login: Complete');

  // Scroll to the bottom of the page to get more elements to load
  await page.waitForSelector('div.feed-container');
  await page.evaluate(() => {
    const feedContainer = document.querySelector('div.feed-container');
    feedContainer.scrollTop = feedContainer.scrollHeight;
  });

  await page.waitForSelector("[data-testid='unfilled_kudos']");

  const allUnfilled = await page.getByTestId('unfilled_kudos');
  const count = await allUnfilled.count();
  console.info(`Found: ${count} kudos to give`);
  for (let i = 0; i < count; i += 1) {
    await allUnfilled.nth(i).click();
    console.info(`\tKudo: Gave out kudo number ${i + 1}`);
  }
});
