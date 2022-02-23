const mongoose = require('mongoose');

console.log('Connecting to database');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Failed to connect to database:', err.message);
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection to database was lost:', err.message);
});

module.exports = db;
