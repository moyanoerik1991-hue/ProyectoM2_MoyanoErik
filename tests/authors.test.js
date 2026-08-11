const request = require('supertest');
const { app } = require('../src/server');

describe('GET /authors', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success');
  });
});