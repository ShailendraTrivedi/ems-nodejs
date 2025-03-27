const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const eventRouter = express.Router();

eventRouter.get("/", eventController.getAllEvent);
eventRouter.post("/", authMiddleware, eventController.createEvent);
eventRouter.put("/:id", authMiddleware, eventController.updateEvent);
eventRouter.delete("/:id", authMiddleware, eventController.deleteEvent);
eventRouter.post("/:eventId/rsvp", authMiddleware, eventController.rsvpToEvent);

module.exports = eventRouter;
