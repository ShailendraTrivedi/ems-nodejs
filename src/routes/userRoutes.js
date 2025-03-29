const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

const routes = [
  { method: "post", path: "/register", handler: userController.register },
  { method: "post", path: "/login", handler: userController.login },
];

routes.forEach(({ method, path, handler }) => {
  userRouter[method](path, handler);
});

module.exports = userRouter;
