class rsvpDto {
  constructor(rsvp) {
    this.rsvpID = rsvp.rsvpID;
    this.eventId = rsvp.eventId;
    this.userId = rsvp.userId;
    this.attending = rsvp.attending;
  }
}

module.exports = rsvpDto;
