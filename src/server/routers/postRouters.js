require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const { getPosts } = require("../controllers/postControllers");

const postRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

postRouter.post("/addPost", uploads.single("image"));
postRouter.get("/", getPosts);

module.exports = postRouter;
