require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
// const multer = require("multer");
// const path = require("path");
const {
  getPosts,
  deletePost,
  createPost,
} = require("../controllers/postControllers/postControllers");

const postRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

postRouter.get("/pageSize=:pageSize&page=:page", getPosts);
postRouter.delete("/delete/:id", deletePost);
postRouter.post("/create", uploads.single("picture"), createPost);

module.exports = postRouter;
