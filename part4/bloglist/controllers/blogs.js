const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

// CREATE
router.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blogToCreate = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const result = await blogToCreate.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

// READ ALL
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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
  const decodedToken = jwt.verify(req.token, SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(204).end();
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'deletion not permitted' });
  }

  blog.remove();
  res.status(204).end();
});

module.exports = router;
