require("dotenv").config();
const debug = require("debug")("set-appArt:server:userControllers");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../database/models/User");

const registerUser = async (req, res, next) => {
  const { name, username, password, picture, pictureBackup } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    debug(chalk.red("User already exists"));
    const error = new Error();
    error.customMessage = "User already exists";
    error.statusCode = 409;

    next(error);
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      name,
      username,
      password: encryptedPassword,
      profilePic: picture,
      profilePicBackup: pictureBackup,
    };
    const newUser = await User.create(newUserData);
    const userData = {
      name: newUser.name,
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

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.red("Incorrect username"));
    const error = new Error("Incorrect username or password");
    error.statusCode = 403;

    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    if (!correctPassword) {
      debug(chalk.red("Incorrect password"));
      const error = new Error("Incorrect username or password");
      error.statusCode = 403;

      next(error);
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET);

      res.status(200).json({ token });
    }
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a user id";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting user";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { registerUser, loginUser, getUser };
