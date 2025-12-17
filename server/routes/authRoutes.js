const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

//routes here
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/test-auth", authMiddleware, (req, res) => {
  res.json({
    message: "Auth works!",
    user: req.user,
  });
});

module.exports = router;
