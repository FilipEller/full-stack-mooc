const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const initialUsers = require('../utils/seeds/seedUsers');
const initialBlogs = require('../utils/seeds/seedBlogs');

const initializeBlogDB = async () => {
  await Blog.deleteMany({});
  await Promise.all(
    initialBlogs.map(blog => new Blog(blog)).map(blog => blog.save())
  );
};

const initializeUserDB = async () => {
  const saltRounds = 10;
  await User.deleteMany({});

  await Promise.all(
    initialUsers.map(async user => {
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

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  const blogsProcessed = blogs.map(blog => JSON.parse(JSON.stringify(blog)));
  // JSON.stringify calls, inter alia, blog's toJSON
  return blogsProcessed;
};

const usersInDB = async () => {
  const users = await User.find({});
  const usersProcessed = users.map(user => JSON.parse(JSON.stringify(user)));
  return usersProcessed;
};

const nonExistingID = async () => {
  const blog = new Blog({
    title: 'temp',
    author: 'temp',
    url: 'temp',
    likes: 0,
  });

  await blog.save();
  await blog.remove();

  return blog.toJSON().id;
};

module.exports = {
  initialBlogs,
  initialUsers,
  initializeBlogDB,
  initializeUserDB,
  blogsInDB,
  usersInDB,
  nonExistingID,
};
