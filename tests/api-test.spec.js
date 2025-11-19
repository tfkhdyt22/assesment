const { test, expect, request } = require('@playwright/test');

const API_KEY = 'reqres-free-v1';
let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    extraHTTPHeaders: { 'x-api-key': API_KEY }
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

// Positive Cases
test('GET user with ID 2', async () => {
  const response = await apiContext.get('https://reqres.in/api/users/2');
  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data.data).toHaveProperty('id');
  expect(data.data.id).toBe(2);
});

test('UPDATE user info', async () => {
  const response = await apiContext.put('https://reqres.in/api/users/2', {
    data: { name: 'Taufik', job: 'QA Engineer' }
  });

  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data).toHaveProperty('name', 'Taufik');
  expect(data).toHaveProperty('updatedAt');
});

test('DELETE user with ID 2', async () => {
  const response = await apiContext.delete('https://reqres.in/api/users/2');

  expect(response.status()).toBe(204);
  expect(await response.text()).toBe('');
});

// Negative Cases
test('GET non existed User', async () => {
  const response = await apiContext.get('https://reqres.in/api/users/999');
  const body = await response.json().catch(() => null);

  expect(response.status()).toBe(404);

});

test('UPDATE non existed User Info', async () => {
  const response = await apiContext.put('https://reqres.in/api/users/2', {
    data: { name: 'Taufik', job: 'QA Engineer' }
  });

  const data = await response.json();
  expect(response.status()).toBe(404);
});

test('DELETE non existed User', async () => {
  const response = await apiContext.delete('https://reqres.in/api/users/999');

  console.log('DELETE /users/999 status:', response.status());

  expect(response.status()).toBe(404);
  expect(await response.text()).toBe('');
});
