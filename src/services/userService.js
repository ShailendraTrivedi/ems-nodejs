const { User } = require("../models");
const UserDTO = require("../dtos/userDto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant");

class UserService {
  async createUser(fullName, username, password) {
    const existingUser = await User.findOne({
      where: { username },
    });
    if (existingUser) throw new Error(`User ${username} already exists`);

    password = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username,
      password,
    });

    return {
      status: true,
      message: "User registered",
      data: new UserDTO(user),
    };
  }

  async loginUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("Invalid credentials");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    const token = jwt.sign({ userID: user.get("userID") }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      status: true,
      message: "Login successful",
      data: { jwtToken: token },
    };
  }
}

module.exports = new UserService();
