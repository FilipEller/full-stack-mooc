const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// CREATE
usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

// READ all
usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;
