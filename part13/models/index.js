const Blog = require('./blog');
const User = require('./user');
const Reading = require('./reading');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Reading, as: 'reading_list' });
Blog.belongsToMany(User, { through: Reading, as: 'users_reading' });

module.exports = {
  Blog,
  User,
  Reading
};
