const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');

const blogs = [...Array(5).keys()].map(i => new Blog({
  _id: i,
  title: `Title${i}`,
  author: `Author${i}`,
  url: `Url${i}`,
  likes: i,
  __v: 0,
}));

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
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

describe('favorite blog', () => {
  test('of a list of one blog is that blog in correct form', () => {
    expect(listHelper.favoriteBlog([blogs[3]])).toEqual({
      title: 'Title3',
      author: 'Author3',
      likes: 3,
    });
  });

  test('of a list of blogs is the one with most likes in correct form', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Title4',
      author: 'Author4',
      likes: 4,
    });
  });

  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });
});
