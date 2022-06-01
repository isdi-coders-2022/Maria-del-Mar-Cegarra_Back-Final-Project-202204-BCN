require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser, loginUser } = require("../controllers/userControllers");

const userRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

userRouter.post("/register", uploads.single("image"), registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
