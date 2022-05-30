const debug = require("debug")("set-appArt:server:userControllers");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  const { file } = req;
  const user = await User.findOne({ username });

  if (user) {
    debug(chalk.red("User already exists"));
    const error = new Error("User already exists");
    error.statusCode = 409;

    next(error);
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    let newUserData = {
      name,
      username,
      password: encryptedPassword,
    };

    if (file) {
      debug(file.originalname);
      const newFileName = `${file.originalname.split(".")[0]}-${Date.now()}.${
        file.originalname.split(".")[1]
      }`;
      debug(newFileName);
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        (error) => {
          if (error) {
            debug(chalk.red(error.message));
            const customError = new Error();
            customError.statusCode = 409;
            customError.customMessage = "Could not rename image";

            next(customError);
          }
        }
      );
      newUserData = { ...newUserData, avatar: path.join(newFileName) };
    }
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
