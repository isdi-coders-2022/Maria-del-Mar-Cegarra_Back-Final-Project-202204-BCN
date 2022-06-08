const debug = require("debug")("set-appArt:server:postControllers");
const chalk = require("chalk");
const fs = require("fs");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
} = require("firebase/storage");
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

  const firebaseConfig = {
    apiKey: "AIzaSyBiiSAjQY776X5a0wd4opeJ1oWRankL4O4",
    authDomain: "pictures-9465d.firebaseapp.com",
    projectId: "pictures-9465d",
    storageBucket: "pictures-9465d.appspot.com",
    messagingSenderId: "458777295431",
    appId: "1:458777295431:web:f31652e5caeda301610f62",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  try {
    if (file) {
      const newFileName = `${file.originalname.split(".")[0]}-${Date.now()}.${
        file.originalname.split(".")[1]
      }`;

      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        async (error) => {
          if (error) {
            debug(chalk.red("Error renaming post picture"));

            next(error);
            return;
          }
          newPost.picture = newFileName;

          fs.readFile(
            path.join("uploads", "images", newFileName),
            async (readError, readFile) => {
              if (readError) {
                debug(chalk.red("Error reading post picture"));

                next(readError);
                return;
              }
              const storage = getStorage(firebaseApp);

              const storageRef = ref(storage, newFileName);
              await uploadBytes(storageRef, readFile);
              const firebaseFileURL = await getDownloadURL(storageRef);

              newPost.pictureBackup = firebaseFileURL;

              const createdPost = await Post.create(newPost);
              res.status(201).json({ post: createdPost });
            }
          );
        }
      );
    }
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Couldn't create post";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { getPosts, deletePost, createPost };
