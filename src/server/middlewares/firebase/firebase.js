const debug = require("debug")("set-appArt:server:firebase");
const chalk = require("chalk");
const { initializeApp } = require("firebase/app");
const path = require("path");
const fs = require("fs");
const {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
} = require("firebase/storage");

const firebase = async (req, res, next) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBiiSAjQY776X5a0wd4opeJ1oWRankL4O4",
    authDomain: "pictures-9465d.firebaseapp.com",
    projectId: "pictures-9465d",
    storageBucket: "pictures-9465d.appspot.com",
    messagingSenderId: "458777295431",
    appId: "1:458777295431:web:f31652e5caeda301610f62",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const { file } = req;

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
          req.body.picture = newFileName;

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

              req.body.pictureBackup = firebaseFileURL;

              next();
            }
          );
        }
      );
    } else {
      next();
    }
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Couldn't process images";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = firebase;
