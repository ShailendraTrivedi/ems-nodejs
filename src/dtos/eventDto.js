class EventDTO {
  constructor(event) {
    this.eventId = event.eventId;
    this.eventName = event.eventName;
    this.eventLocation = event.eventLocation;
    this.eventDateTime = event.eventDateTime;
    this.users = event.users;
  }
}

module.exports = EventDTO;
