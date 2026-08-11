const request = require('supertest');
const { app } = require('../src/server');

describe('Posts API', () => {
  it('GET /posts returns a success response', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('POST /posts creates a new post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Nuevo post de prueba',
        content: 'Contenido de prueba con Supertest',
        author_id: 1,
        published: true
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('title', 'Nuevo post de prueba');
  });
});
