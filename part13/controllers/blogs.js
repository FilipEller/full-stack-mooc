const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { author, title, url, likes } = req.body;
    const blog = await Blog.create({ author, title, url, likes });
    return res.json(blog);
  } catch (e) {
    console.log('Error:', e);
    return res.status(400).json({ error: e.message });
  }
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  const likes = Number(req.body.likes);
  if (req.blog && !Number.isNaN(likes)) {
    req.blog.likes = likes;
    await req.blog.save();
    res.json({ likes });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  return res.status(200).end();
});

module.exports = router;
