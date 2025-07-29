import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
const ajv = new Ajv();

const transactionSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    transaction: { type: 'string' },
    date: { type: 'string' },
    description: { type: 'string' },
    type: { type: 'string' },
    amount: { type: 'number' },
  },
  required: ['id', 'transaction', 'date', 'description', 'type', 'amount'],
};

test('Parabank API: Deposit, Get Account, Update Customer', async () => {
  const apiContext = await request.newContext();

  // 1. POST /deposit funds
  const depositPayload = { accountId: 12345, amount: 100 };
  const depositRes = await apiContext.post(`${BASE_URL}/deposit`, { data: depositPayload });
  console.log('Deposit response:', await depositRes.text());
  expect(depositRes.status()).toBe(200);
  const depositBody = await depositRes.json();
  expect(depositBody).toEqual(expect.objectContaining({
    id: expect.any(Number),
    transaction: expect.any(String),
    date: expect.any(String),
    description: expect.any(String),
    type: expect.any(String),
    amount: expect.any(Number),
  }));
  const validDeposit = ajv.validate(transactionSchema, depositBody);
  expect(validDeposit).toBe(true);
  console.log(`Deposit: id=${depositBody.id}, amount=${depositBody.amount}`);

  // 2. GET /accounts/{id}
  const accountId = depositPayload.accountId;
  const getAccountRes = await apiContext.get(`${BASE_URL}/accounts/${accountId}`);
  console.log('Get Account response:', await getAccountRes.text());
  expect(getAccountRes.status()).toBe(200);
  const accountBody = await getAccountRes.json();
  expect(accountBody).toHaveProperty('id', accountId);
  // Optionally validate account schema if available

  // 3. PUT /customers/{id} (update info)
  const customerId = 12345; // Replace with a real customer id if available
  const updatePayload = { firstName: 'Updated', lastName: 'Customer' };
  const updateRes = await apiContext.put(`${BASE_URL}/customers/${customerId}`, { data: updatePayload });
  console.log('Update Customer response:', await updateRes.text());
  expect(updateRes.status()).toBe(200);
  const updateBody = await updateRes.json();
  expect(updateBody).toHaveProperty('id', customerId);
  // Optionally validate updated customer schema if available

  await apiContext.dispose();
});
