const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { PORT, MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

app.use(morgan('short'));

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.success('Connected to database');
  })
  .catch((err) => {
    logger.error('Failed to connect to database:', err.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

// Test middleware
app.use('/error', () => {
  throw new Error('testing error');
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
