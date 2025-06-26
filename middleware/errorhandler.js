class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.name, message: err.message });
}

module.exports = { errorHandler, NotFoundError, ValidationError };
