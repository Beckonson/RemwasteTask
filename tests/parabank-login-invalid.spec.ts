import { test, expect, chromium } from '@playwright/test';

test('ParaBank unsuccessful login with invalid credentials', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to ParaBank
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // Step 2: Login with invalid username and password
  await page.locator('input[name="username"]').fill('invalidUse');
  await page.locator('input[name="password"]').fill('invalidPa');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Step 3: Verify unsuccessful login
  // Only check for the error message, not the URL, to avoid false negatives if the app redirects
  await expect(page.getByText('The username and password could not be verified.')).toBeVisible();

  // Close browser
  await browser.close();
});
