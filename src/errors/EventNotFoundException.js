class EventNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "EventNotFoundException";
    this.statusCode = 404;
  }
}

module.exports = EventNotFoundException;
