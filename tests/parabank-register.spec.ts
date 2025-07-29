import { test, expect, chromium } from '@playwright/test';

test('ParaBank register new user and validate successful creation', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to ParaBank registration page
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();

  // Step 2: Fill registration form
  await page.locator('[id="customer.firstName"]').fill('Porta');
  await page.locator('[id="customer.lastName"]').fill('Ann');
  await page.locator('[id="customer.address.street"]').fill('No.20 Main st');
  await page.locator('[id="customer.address.city"]').fill('Calabar');
  await page.locator('[id="customer.address.state"]').fill('CR');
  await page.locator('[id="customer.address.zipCode"]').fill('508973');
  await page.locator('[id="customer.phoneNumber"]').fill('0709822222');
  await page.locator('[id="customer.ssn"]').fill('123-45-6789');
  await page.locator('[id="customer.username"]').fill('Patene2');
  await page.locator('[id="customer.password"]').fill('pat999');
  await page.locator('#repeatedPassword').fill('pat999');
  await page.getByRole('button', { name: 'Register' }).click();

  // Step 3: Verify user successfully created
  await expect(page.getByRole('heading', { name: /Welcome Patene2/i })).toBeVisible();
  await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();

  // Close browser
  await browser.close();
});
