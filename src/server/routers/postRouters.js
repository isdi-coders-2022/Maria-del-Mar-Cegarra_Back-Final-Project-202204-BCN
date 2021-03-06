require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getPosts,
  deletePost,
  createPost,
  editPost,
  getOnePost,
  getUserPosts,
} = require("../controllers/postControllers/postControllers");
const firebase = require("../middlewares/firebase/firebase");

const postRouter = express.Router();
const maxSize = 200 * 1024 * 1024;
const uploads = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: maxSize },
});

postRouter.get("/pageSize=:pageSize&page=:page", getPosts);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/edit/:postId", multer().none(), editPost);
postRouter.post("/create", uploads.single("picture"), firebase, createPost);
postRouter.get("/:postId", getOnePost);
postRouter.get(
  "/user-posts/user=:userId&pageSize=:pageSize&page=:page",
  getUserPosts
);

module.exports = postRouter;
