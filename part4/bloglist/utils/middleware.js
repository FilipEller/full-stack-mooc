const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};

module.exports = { unknownEndpoint, errorHandler };
