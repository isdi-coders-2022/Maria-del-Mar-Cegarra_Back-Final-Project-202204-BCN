require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const { getPosts } = require("../controllers/postControllers");

const postRouter = express.Router();
const uploads = multer({ dest: path.join("uploads", "images") });

postRouter.post("/addPost", uploads.single("image"));

postRouter.get("/pageSize=:pageSize&page=:page", getPosts);

module.exports = postRouter;
