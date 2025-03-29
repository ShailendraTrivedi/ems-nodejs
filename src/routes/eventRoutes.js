const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const eventRouter = express.Router();

const routes = [
  { method: "get", path: "/", handler: eventController.getAllEvent },
  { method: "post", path: "/", handler: eventController.createEvent },
  { method: "put", path: "/:id", handler: eventController.updateEvent },
  { method: "delete", path: "/:id", handler: eventController.deleteEvent },
  {
    method: "post",
    path: "/:eventId/rsvp",
    handler: eventController.rsvpToEvent,
  },
];

routes.forEach(({ method, path, handler }) => {
  eventRouter[method](path, authMiddleware, handler);
});

module.exports = eventRouter;
