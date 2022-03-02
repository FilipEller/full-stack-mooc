const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const blogs = [...Array(5).keys()].map(i => new Blog({
    _id: i,
    title: `Title${i}`,
    author: `Author${i}`,
    url: `Url${i}`,
    likes: i,
    __v: 0,
  }));

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that blog', () => {
    expect(listHelper.totalLikes([blogs[3]])).toBe(3);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(10);
  });
});
