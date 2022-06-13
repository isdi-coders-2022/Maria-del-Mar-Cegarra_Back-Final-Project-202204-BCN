require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers/userControllers");
const firebase = require("../middlewares/firebase/firebase");

const userRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

userRouter.post(
  "/register",
  uploads.single("profilePic"),
  firebase,
  registerUser
);
userRouter.post("/login", loginUser);
userRouter.get("/user/:userId", getUser);

module.exports = userRouter;
