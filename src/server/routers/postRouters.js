require("dotenv").config();
const express = require("express");
// const multer = require("multer");
// const path = require("path");
const { getPosts, deletePost } = require("../controllers/postControllers");

const postRouter = express.Router();
// const uploads = multer({ dest: path.join("uploads", "images") });

// postRouter.delete("/:id", uploads.single("image"));

postRouter.get("/pageSize=:pageSize&page=:page", getPosts);
postRouter.delete("/delete/:id", deletePost);

module.exports = postRouter;
