const userService = require("../services/userService");

class UserController {
  async register(req, res) {
    try {
      const { fullName, username, password } = req.body;
      const response = await userService.createUser(
        fullName,
        username,
        password
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ status: "ERROR", message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const response = await userService.loginUser(username, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ status: "ERROR", message: error.message });
    }
  }
}

module.exports = new UserController();
