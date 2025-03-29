const throwError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode && err.statusCode < 500 ? err.statusCode : 500;
  const message = statusCode !== 500 ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    status: "ERROR",
    message,
    data: null,
  });
};

module.exports = { errorHandler, throwError };
