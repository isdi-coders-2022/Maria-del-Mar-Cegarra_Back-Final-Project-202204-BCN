require("dotenv").config();
const express = require("express");
const {
  createGallery,
} = require("../../controllers/galleryControllers/galleryControllers");

const galleryRouter = express.Router();

galleryRouter.post("/create", createGallery);

module.exports = galleryRouter;
