class UserException extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "UserException";
    this.statusCode = statusCode;
  }
}

module.exports = UserException;
