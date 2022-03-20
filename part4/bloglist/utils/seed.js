const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('./logger');
const { MONGODB_URI } = require('./config');
const seedUsers = require('./seeds/seedUsers');
const seedBlogs = require('./seeds/seedBlogs');

const initializeUserDB = async () => {
  const saltRounds = 10;
  await User.deleteMany({});

  await Promise.all(
    seedUsers.map(async user => {
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      const userObj = new User({
        username: user.username,
        name: user.name,
        passwordHash,
      });
      userObj.save();
    })
  );
};

const initializeBlogDB = async () => {
  await Blog.deleteMany({});
  const users = await User.find({});

  /* eslint-disable */
  for (let i = 0; i < seedBlogs.length; i++) {
    const user = users[i % users.length];
    const seed = seedBlogs[i];
    const blog = new Blog({ ...seed, user: user._id });
    
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();
  }
};

const main = async () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      logger.success('Connected to database');
    })
    .catch(err => {
      logger.error('Failed to connect to database:', err.message);
    });

  await initializeUserDB();
  logger.success('Users seeded')
  await initializeBlogDB();
  logger.success('Blogs seeded')
  mongoose.connection.close();
};

main();
