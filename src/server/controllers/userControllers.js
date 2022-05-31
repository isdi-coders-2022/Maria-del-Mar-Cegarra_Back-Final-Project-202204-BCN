require("dotenv").config();
const debug = require("debug")("set-appArt:server:userControllers");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    debug(chalk.red("User already exists"));
    const error = new Error();
    error.customMessage = "User already exists";
    error.statusCode = 400;

    next(error);
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      name,
      username,
      password: encryptedPassword,
    };
    const newUser = await User.create(newUserData);
    const userData = {
      username: newUser.username,
      id: newUser.id,
    };
    const token = jwt.sign(userData, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    error.customMessage = "Couldn't create user";
    error.statusCode = 409;

    next(error);
  }
};

module.exports = { registerUser };
