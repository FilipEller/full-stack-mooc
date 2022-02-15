const mongoose = require('mongoose');

console.log('Connecting to database')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(error => {
    console.log('Failed to connect to database:', error.message);
  })

const db = mongoose.connection;

db.on('error', error => {
  console.log('Connection to database was lost:', error.message);
})

module.exports = db