const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

module.exports = router;
