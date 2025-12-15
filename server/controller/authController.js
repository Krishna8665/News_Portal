const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const envConfig = require("../config/config");

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Please provide email,password,phoneNumber",
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
    res.status(400).json({
      message: "Please provide email,password",
    });
  }
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "USer with that email is not registered",
    });
  }
  //password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    //generate token
    const token = jwt.sign({ id: userFound[0]._id }, envConfig.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
};
