const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ status: "ERROR", message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded.userID;
    next();
  } catch (error) {
    res.status(401).json({ status: "ERROR", message: "Invalid token." });
  }
};

module.exports = authMiddleware;
