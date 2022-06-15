const debug = require("debug")("set-appArt:server:galleryControllers");
const chalk = require("chalk");
const Gallery = require("../../../database/models/Gallery");

const createGallery = async (req, res, next) => {
  const { name, location } = req.body;
  if (!(name && location)) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a name and location";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const newGallery = {
      name,
      location,
    };
    const createdGallery = await Gallery.create(newGallery);

    res.status(201).json({ gallery: createdGallery });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error creating gallery";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { createGallery };
