import { chromium } from '@playwright/test';
import { IUser } from '@interfaces';
import LoginPage from '@pages/LoginPage';

/**
 * @returns {Boolean} Success of storage state getting propagated.
 */
export const propagateStorageState = async (user:IUser) => {
  try {
    // Login a user once, at runtime
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = await new LoginPage(page);

    // First force logout the user if one is already logged in
    await loginPage.navigateToUrl('logout');

    // Second use the non-logged in UI to login
    await loginPage.visit();
    await loginPage.loginToApplication(user);

    // Update storage state of that users path data
    await context.storageState({ path: user.storagePath });
    await browser.close();
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
