const debug = require("debug")("set-appArt:server:postControllers");
const chalk = require("chalk");
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
    error.customMessage = "Error getting posts";
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
  const { caption, userId, hashtags, gallery, picture, pictureBackup } =
    req.body;
  const date = Date.now();

  const newPost = {
    user: userId,
    caption,
    date,
    hashtags,
    gallery,
    picture,
    pictureBackup,
  };

  try {
    const createdPost = await Post.create(newPost);

    res.status(201).json({ post: createdPost });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Couldn't create post";
    debug(chalk.red(error.message));

    next(error);
  }
};

const editPost = async (req, res, next) => {
  const { postId } = req.params;
  const post = req.body;
  try {
    if (!postId) {
      const error = new Error();
      error.statusCode = 400;
      error.customMessage = "PostId not provided";

      next(error);
      return;
    }
    await Post.findByIdAndUpdate({ _id: postId }, post);

    res.status(204).json({});
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Not modified";

    next(error);
  }
};

const getOnePost = async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a post id size";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const post = await Post.findById(postId);

    res.status(200).json({ post });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting post";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { getPosts, deletePost, createPost, editPost, getOnePost };
