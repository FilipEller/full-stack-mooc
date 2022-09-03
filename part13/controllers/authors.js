const router = require('express').Router();
const sequelize = require('sequelize');

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    group: ['author'],
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']],
  });
  // console.log(JSON.stringify(blogs, null, 2));
  res.send(blogs);
});

module.exports = router;
