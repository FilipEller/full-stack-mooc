const express = require('express');
require('express-async-errors');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/api/blogs', blogsRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log('Error:', error.name, error.message);

  if (error.name == 'SequelizeValidationError') {
    return res.status(400).send({ error: 'Invalid input, validation error' });
  }
  if (error.name == 'SequelizeDatabaseError') {
    return res.status(400).send({ error: 'Invalid input, database error' });
  }
  return res.status(500).send({ error: error.message });
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
