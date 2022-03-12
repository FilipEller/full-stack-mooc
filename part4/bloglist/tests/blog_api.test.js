const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await helper.initializeDB();
});

describe('with some initially saved blogs', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs have a property named id', async () => {
    const response = await api.get('/api/blogs');
    response.body
      .forEach(blog => expect(blog.id).toBeDefined());
  });
});

afterAll(() => {
  mongoose.connection.close();
});
