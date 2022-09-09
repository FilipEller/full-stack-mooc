const express = require('express');
require('express-async-errors');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const readingListsRouter = require('./controllers/readingLists');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error('ERROR CAUGHT:', error.name, error.message);

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: error.errors?.length ? error.errors[0].message : error.message,
    });
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({
      error: error.errors?.length ? error.errors[0].message : error.message,
    });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({
      error: error.errors?.length ? error.errors[0].message : error.message,
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(400).send({
      error: error.message,
    });
  }
  next(error);
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
