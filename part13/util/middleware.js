const jwt = require('jsonwebtoken');

const { Blog, User } = require('../models');
const { SECRET } = require('../util/config');

const tokenExtractor = (req, res, next) => {
  console.log('headers', req.headers);
  const authorization = req.get('authorization');
  if (!authorization) {
    return res.status(401).send({ error: 'missing token' });
  }
  if (!authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).send({ error: 'invalid token' });
  }

  const encodedToken = authorization.substring(7);
  const decodedToken = jwt.verify(encodedToken, SECRET);

  req.token = encodedToken;
  req.decodedToken = decodedToken;
  next();
};

const userExtractor = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken?.id);
  req.user = user;
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  next();
};

module.exports = { tokenExtractor, userExtractor, blogFinder };
