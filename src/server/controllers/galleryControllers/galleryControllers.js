const debug = require("debug")("set-appArt:server:postControllers");
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

const getOneGallery = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "Please provide a gallery id";
    debug(chalk.red(error.customMessage));

    next(error);
  }
  try {
    const gallery = await Gallery.findById(id);

    res.status(201).json({ gallery });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = `Error getting gallery ${id}`;
    debug(chalk.red(error.message));

    next(error);
  }
};

const getGalleries = async (req, res, next) => {
  try {
    const galleries = await Gallery.find().sort({ name: -1 });

    res.status(201).json({ galleries });
  } catch (error) {
    error.statusCode = 409;
    error.customMessage = "Error getting galleries";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = { createGallery, getGalleries, getOneGallery };
