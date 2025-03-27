const { RSVP, Event, User } = require("../models");
const rsvpDto = require("../dtos/rsvpDto");

class RSVPService {
  async registerRSVP(eventId, userId, attending) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error(`User with ID ${userId} not found`);

    const event = await Event.findByPk(eventId);
    if (!event) throw new Error(`Event with ID ${eventId} not found`);

    const existingRSVP = await RSVP.findOne({ where: { eventId, userId } });
    if (existingRSVP) throw new Error("RSVP already exists");

    const rsvp = await RSVP.create({ eventId, userId, attending });

    return {
      status: "SUCCESS",
      message: "RSVP registered",
      data: new rsvpDto(rsvp),
    };
  }
}

module.exports = new RSVPService();
