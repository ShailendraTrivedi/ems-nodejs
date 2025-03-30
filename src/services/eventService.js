const { Event } = require("../models");
const EventDTO = require("../dtos/eventDto");
const RsvpDTO = require("../dtos/rsvpDto");
const { throwError } = require("../middleware/errorHandler");
const validateInputs = require("../utils/validateInputs");

class EventService {
  async getAllEvents(page, limit) {
    validateInputs({ page, limit });

    const offset = page * limit;
    const { count, rows } = await Event.findAndCountAll({
      offset,
      limit,
      include: [
        {
          association: "RSVPs",
          required: false,
        },
      ],
    });

    const events = rows.map(
      ({ dataValues, RSVPs }) =>
        new EventDTO({
          ...dataValues,
          users: RSVPs?.map((rsvp) => new RsvpDTO(rsvp)) || [],
        })
    );

    return {
      status: true,
      messageL: "Retrieve all the events.",
      data: { total: count, events },
    };
  }

  async createEvent(eventData) {
    const { eventName, eventLocation, eventDateTime } = eventData;
    validateInputs({ eventName, eventLocation, eventDateTime });

    const event = await Event.create(eventData);
    return {
      status: true,
      message: "Event created successfully",
      data: new EventDTO(event),
    };
  }

  async updateEvent(eventId, eventData) {
    validateInputs({ eventId });

    const event = await Event.findByPk(eventId);
    if (!event) throwError(`Event with ID ${eventId} not found`);

    await event.update(eventData);
    return {
      status: true,
      message: "Event updated successfully",
      data: new EventDTO(event),
    };
  }

  async deleteEvent(eventId) {
    validateInputs({ eventId });

    const event = await Event.findByPk(eventId);
    if (!event) throwError(`Event with ID ${eventId} not found`);

    await event.destroy();
    return {
      status: true,
      message: "Event deleted successfully",
      data: event,
    };
  }
}

module.exports = new EventService();
