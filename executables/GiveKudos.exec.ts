import { test, expect } from '@playwright/test';
import { stravaUser } from '@interfaces';

test('sanity ', async ({ page }) => {
  await page.goto('https://www.strava.com/login');
  await page.getByPlaceholder('Your Email').fill(stravaUser.email);
  await page.getByPlaceholder('Password').fill(stravaUser.password);
  await page.getByRole('button', { name: 'Log In' }).click();
	
  //await page.goto('https://www.strava.com/dashboard');
  await expect(page).toHaveURL('https://www.strava.com/dashboard');

	await page.waitForSelector("[data-testid='unfilled_kudos']")

  const allUnfilled = await page.getByTestId('unfilled_kudos');
	for (let i=0; i < await allUnfilled.count(); i++) {
		await allUnfilled.nth(i).click();
	}
	
  //await page.getByTestId('kudos_button').click();
  //await expect(page).toHaveURL('https://www.strava.com/dashboard?num_entries=20');

});
