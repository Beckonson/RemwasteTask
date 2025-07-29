import { test, expect, chromium } from '@playwright/test';

test('ParaBank login and validate successful login', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to ParaBank
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // Step 2: Login with username and password
  await page.locator('input[name="username"]').fill('Patene');
  await page.locator('input[name="password"]').fill('Pat@123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Step 3: Verify and validate successful login
 // await expect(page).toHaveURL(/.*overview\.htm/);
  await expect(page.getByText('Welcome')).toBeVisible();
  await expect(page.getByText('Account Services')).toBeVisible();

  // Close browser
  await browser.close();
});
