const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const envConfig = require("../config/config");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, envConfig.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-userPassword");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    console.log("USER FROM TOKEN:", req.user.role);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
