const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = blogs => {
  if (!blogs.length) {
    return null;
  }
  const favorite = blogs.reduce((fav, blog) => (blog.likes > fav.likes
    ? blog
    : fav));

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = blogs => {
  if (!blogs.length) {
    return null;
  }

  const authors = {};
  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });

  // find author with most blogs. Not implemented.
  authors.keys().reduce((most, author) => (authors[author] > authors[most]
    ? author
    : most));

  return null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
