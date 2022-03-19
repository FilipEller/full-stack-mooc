const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const initialUsers = [
  {
    username: 'italo',
    name: 'Italo Calvino',
    password: 'secret0',
  },
  {
    username: 'tolstoy',
    name: 'Leo Tolstoy',
    password: 'secret1',
  },
  {
    username: 'dante',
    name: 'Dante Alighieri',
    password: 'secret2',
  },
];

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
