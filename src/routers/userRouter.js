const express = require("express");
const { registerUser } = require("../server/controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

module.exports = userRouter;
