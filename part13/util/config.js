require('dotenv').config();

const { DATABASE_URL, PORT, SECRET } = process.env;

module.exports = {
  DATABASE_URL,
  PORT: PORT || 3001,
  SECRET
};
