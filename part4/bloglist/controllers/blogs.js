const router = require('express').Router();
const Blog = require('../models/blog');

// CREATE
router.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const blogToCreate = new Blog({
    title,
    author,
    url,
    likes,
  });

  const result = await blogToCreate.save();
  res.status(201).json(result);
});

// READ ALL
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const blogToUpdate = {
    title,
    author,
    url,
    likes,
  };

  const result = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, {
    new: true,
  });
  res.json(result);
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = router;
