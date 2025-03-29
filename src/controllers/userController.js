const userService = require("../services/userService");

class UserController {
  async register(req, res, next) {
    try {
      const { fullName, username, password } = req.body;
      const response = await userService.createUser(
        fullName,
        username,
        password
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const response = await userService.loginUser(username, password);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
