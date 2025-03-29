const { RSVP, Event, User } = require("../models");
const rsvpDto = require("../dtos/rsvpDto");
const { throwError } = require("../middleware/errorHandler");

class RSVPService {
  async registerRSVP(eventId, userId, attending) {
    const user = await User.findByPk(userId);
    if (!user) throwError(`User with ID ${userId} not found`);

    const event = await Event.findByPk(eventId);
    if (!event) throwError(`Event with ID ${eventId} not found`);

    const existingRSVP = await RSVP.findOne({ where: { eventId, userId } });
    if (existingRSVP) throwError("RSVP already exists");

    const rsvp = await RSVP.create({ eventId, userId, attending });

    return {
      status: "SUCCESS",
      message: "RSVP registered",
      data: new rsvpDto(rsvp),
    };
  }
}

module.exports = new RSVPService();
