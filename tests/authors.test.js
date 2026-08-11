const request = require('supertest');
const { app } = require('../src/server');

describe('Authors API', () => {
  it('GET /authors returns a success response', async () => {
    const response = await request(app).get('/authors');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('POST /authors creates a new author', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        email: `test.author.${Date.now()}@example.com`,
        bio: 'Created by Supertest'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('email');
  });
});