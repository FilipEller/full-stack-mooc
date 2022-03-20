const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }

  logger.error(err.message);

  next(err);
};

const tokenExtractor = (req, res, next) => {
  console.log('extracting token');
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

module.exports = { unknownEndpoint, errorHandler, tokenExtractor };
