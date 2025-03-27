class InvalidEventIDException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidEventIDException";
    this.statusCode = 400;
  }
}

module.exports = InvalidEventIDException;
