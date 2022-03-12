const router = require('express').Router();
const Blog = require('../models/blog');

// READ ALL
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// CREATE
router.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body; // eslint-disable-line
  const blog = new Blog({ title, author, url, likes }); // eslint-disable-line

  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = router;
