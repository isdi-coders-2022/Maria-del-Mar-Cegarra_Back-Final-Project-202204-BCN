const debug = require("debug")("set-appArt:server:postControllers");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Post = require("../../../database/models/Post");

const getPosts = async (req, res, next) => {
  const { pageSize, page } = req.params;
  if (!(pageSize && page)) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a page and a page size";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const posts = await Post.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({ posts });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting post";
    debug(chalk.red(error.message));

    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide an id";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const postDeleted = await Post.findByIdAndDelete(id);

    res.status(200).json({ postDeleted });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting post";
    debug(chalk.red(error.message));

    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { caption, userId, hashtags, gallery } = req.body;
    const date = Date.now();
    const newPost = {
      user: userId,
      caption,
      date,
      hashtags,
      gallery,
    };

    const { file } = req;
    if (file) {
      const newFileName = `${file.originalname.split(".")[0]}-${Date.now()}.${
        file.originalname.split(".")[1]
      }`;
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        (error) => {
          if (error) {
            debug(chalk.red("Error renaming picture post"));

            next(error);
          }
        }
      );
      newPost.picture = newFileName;
    }
    const createdPost = await Post.create(newPost);

    res.status(201).json({ post: createdPost });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Couldn't create post";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { getPosts, deletePost, createPost };
