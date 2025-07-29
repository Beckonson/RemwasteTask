import { test, expect, chromium } from '@playwright/test';

test('ParaBank login, update address, and verify update', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to ParaBank
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // Step 2: Login with username and password
  await page.locator('input[name="username"]').fill('Patene2');
  await page.locator('input[name="password"]').fill('pat999');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Step 3: Go to Update Contact Info
  await page.getByRole('link', { name: 'Update Contact Info' }).click();

  // Step 4: Edit Address field
  await page.locator('[id="customer.address.street"]').fill('No 1 john Str');
  await page.getByRole('button', { name: 'Update Profile' }).click();

  // Step 5: Verify new address successfully updated
  await expect(page.getByText('Profile Updated')).toBeVisible();
  await expect(await page.locator('[id="customer.address.street"]').inputValue()).toBe('No 1 john Str');

  // Close browser
  await browser.close();
});
