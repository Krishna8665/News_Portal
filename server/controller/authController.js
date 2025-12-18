const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const envConfig = require("../config/config");

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Please provide email,password",
    });
  } //else
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "USer with that email already registered",
    });
  }

  await User.create({
    userName: username,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User Registered successfully !!",
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ userEmail: email });

  if (!user) {
    return res.status(400).json({
      message: "User with that email is not registered",
    });
  }

  const isMatched = bcrypt.compareSync(password, user.userPassword);

  if (!isMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user._id },
    envConfig.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      email: user.userEmail,
      username: user.userName,
      role: user.role,
    },
  });
};
