const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const {
  tokenExtractor,
  userExtractor,
  blogFinder,
} = require('../util/middleware');

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    const param = { [Op.iLike]: `%${req.query.search}%` };
    where = {
      ...where,
      [Op.or]: [{ title: param }, { author: param }],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  // console.log(JSON.stringify(blogs, null, 2));
  res.send(blogs);
});

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  console.log(req.body);
  if (!req.user) {
    return res.status(401).end();
  }
  const { author, title, url, likes, year } = req.body;
  const { id: userId } = req.user;
  const blog = await Blog.create({
    author,
    title,
    url,
    likes,
    userId,
    year,
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

router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  blogFinder,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }
    if (req.user.id !== req.blog?.userId) {
      return res.status(403).end();
    }
    if (req.blog) {
      await req.blog.destroy();
    }
    return res.status(200).end();
  }
);

module.exports = router;
