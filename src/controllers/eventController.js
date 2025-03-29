const { throwError } = require("../middleware/errorHandler");
const eventService = require("../services/eventService");
const rsvpService = require("../services/rsvpService");

class EventController {
  async getAllEvent(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const response = await eventService.getAllEvents(page - 1, limit);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req, res, next) {
    try {
      const response = await eventService.createEvent(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req, res, next) {
    try {
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) throw new Error("Invalid Event ID");

      const response = await eventService.updateEvent(eventId, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteEvent(req, res, next) {
    try {
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) throw new Error("Invalid Event ID");

      const response = await eventService.deleteEvent(eventId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async rsvpToEvent(req, res, next) {
    try {
      const eventId = parseInt(req.params.eventId);
      if (isNaN(eventId)) throw new Error("Invalid Event ID");
      const userID = req.user;
      const { attending } = req.body;
      const response = await rsvpService.registerRSVP(
        eventId,
        userID,
        attending
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ status: "ERROR", message: error.message });
    }
  }
}

module.exports = new EventController();
