const debug = require("debug")("set-appArt:server:postControllers");
const chalk = require("chalk");
const Post = require("../../database/models/Post");

const getPosts = async (req, res, next) => {
  const { pageSize, page } = req.body;
  if (pageSize && page) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a page and a page size";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const posts = await Post.find({})
      .limit(pageSize)
      .skip(pageSize * page);

    res.status(200).json({ posts });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting post";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { getPosts };
