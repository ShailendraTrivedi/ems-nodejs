const { User } = require("../models");
const UserDTO = require("../dtos/userDto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant");
const { throwError } = require("../middleware/errorHandler");
const validateInputs = require("../utils/validateInputs");

class UserService {
  async createUser(fullName, username, password) {
    validateInputs({ fullName, username, password });

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) throwError(`User ${username} already exists.`);

    password = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, username, password });

    const token = jwt.sign({ userID: user.get("userID") }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      status: true,
      message: "User registered",
      data: { user: new UserDTO(user), jwtToken: token },
    };
  }

  async loginUser(username, password) {
    validateInputs({ username, password });

    const user = await User.findOne({ where: { username } });
    if (!user) throwError("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throwError("Invalid credentials");

    const token = jwt.sign({ userID: user.get("userID") }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      status: true,
      message: "Login successful",
      data: { user: new UserDTO(user), jwtToken: token },
    };
  }
}

module.exports = new UserService();
