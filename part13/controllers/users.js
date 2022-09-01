const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.post('/', async (req, res) => {
  const { username, name } = req.body;
  const user = await User.create({ username, name });
  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (!user) {
    return res.status(404).end();
  }

  const { username: targetUsername } = req.body;

  const target = await User.findOne({
    where: {
      username: targetUsername,
    },
  });

  if (target) {
    return res.status(401).send({ error: 'Username already taken' });
  }

  user.username = targetUsername;
  user.save();
  res.send(user);
});

module.exports = router;
