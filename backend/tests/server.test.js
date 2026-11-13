const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server');

test('GET /health returns ok', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('register and login flow', async () => {
  const email = `candidate-${Date.now()}@smarthire.ai`;

  const registerResponse = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Candidate User',
      email,
      password: 'Password123',
      role: 'candidate'
    });

  assert.equal(registerResponse.status, 201);
  assert.ok(registerResponse.body.token);

  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ email, password: 'Password123' });

  assert.equal(loginResponse.status, 200);
  assert.ok(loginResponse.body.token);
});

test('job list endpoint works', async () => {
  const response = await request(app).get('/api/jobs');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.jobs));
});
