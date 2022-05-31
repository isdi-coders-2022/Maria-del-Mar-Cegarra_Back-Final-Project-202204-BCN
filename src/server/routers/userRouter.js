require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser } = require("../controllers/userControllers");

const userRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

userRouter.post("/register", uploads.single("image"), registerUser);

module.exports = userRouter;
