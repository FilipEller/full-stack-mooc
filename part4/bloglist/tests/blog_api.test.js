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
    expect(response.body)
      .toHaveLength(helper.initialBlogs.length);
  });

  test('blogs have a property named id', async () => {
    const response = await api.get('/api/blogs');
    response.body
      .forEach(blog => expect(blog.id).toBeDefined());
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'My Statement on Ukraine',
      author: 'Barack Obama',
      url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
      likes: 16,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogs = response.body;

    expect(blogs)
      .toHaveLength(helper.initialBlogs.length + 1);
    expect(blogs
      .map(({ title, author, url, likes }) => ({
        title, author, url, likes,
      })))
      .toContainEqual(newBlog);
  });

  test('succeeds with missing likes interpreted as 0 likes', async () => {
    const newBlog = {
      title: 'My Statement on Ukraine',
      author: 'Barack Obama',
      url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogs = response.body;

    expect(blogs)
      .toHaveLength(helper.initialBlogs.length + 1);
    expect(blogs
      .map(({ title, author, url, likes }) => ({
        title, author, url, likes,
      })))
      .toContainEqual({ ...newBlog, likes: 0 });
  });

  test('fails with status code 400 if title or URL is missing', async () => {
    const blogWithoutTitle = {
      author: 'Barack Obama',
      url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
      likes: 16,
    };

    const blogWithoutURL = {
      title: 'My Statement on Ukraine',
      author: 'Barack Obama',
      likes: 16,
    };

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(blogWithoutURL)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBefore = await helper.blogsInDB();
    const blogToDelete = blogsBefore[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAfter = await helper.blogsInDB();
    expect(blogsAfter)
      .toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAfter
      .map(blog => blog.id))
      .not.toContain(blogToDelete.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
