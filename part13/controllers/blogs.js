const router = require('express').Router();
const { Blog } = require('../models');
const {
  tokenExtractor,
  userExtractor,
  blogFinder,
} = require('../util/middleware');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.send(blogs);
});

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  console.log(req.body);
  if (!req.user) {
    res.status(401).end();
  }
  const { author, title, url, likes } = req.body;
  const { id: userId } = req.user;
  const blog = await Blog.create({
    author,
    title,
    url,
    likes,
    userId,
  });
  return res.send(blog);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  const likes = Number(req.body.likes);
  if (req.blog) {
    req.blog.likes = likes;
    await req.blog.save();
    res.json({ likes });
  } else {
    return res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  return res.status(200).end();
});

module.exports = router;
