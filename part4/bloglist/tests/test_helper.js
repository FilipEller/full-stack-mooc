const Blog = require('../models/blog');

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

const initializeDB = async () => {
  await Blog.deleteMany({});
  await Promise.all(initialBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save()));
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  const blogsProcessed = blogs
    .map(blog => JSON.parse(JSON.stringify(blog)));
  // JSON.stringify calls, inter alia, blog's toJSON
  return blogsProcessed;
};

const nonExistingID = async () => {
  const blog = new Blog({
    title: 'temp', author: 'temp', url: 'temp', likes: 0,
  });

  await blog.save();
  await blog.remove();

  return blog.toJSON().id;
};

module.exports = {
  initialBlogs, initializeDB, blogsInDB, nonExistingID,
};
