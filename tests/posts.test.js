const request = require('supertest');
const { app } = require('../src/server');

describe('GET /posts', () => {
  it('should return 200 and a success payload', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
