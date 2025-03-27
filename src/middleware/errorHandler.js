const EventNotFoundException = require("../errors/EventNotFoundException");
const InvalidEventIDException = require("../errors/InvalidEventIDException");
const UserException = require("../errors/UserException");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (
    err instanceof EventNotFoundException ||
    err instanceof InvalidEventIDException ||
    err instanceof UserException
  ) {
    return res.status(err.statusCode || 400).json({
      status: "ERROR",
      message: err.message,
      data: null,
    });
  }

  return res.status(500).json({
    status: "ERROR",
    message: "Internal Server Error",
    data: null,
  });
};

module.exports = errorHandler;
