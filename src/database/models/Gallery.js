const { Schema, model } = require("mongoose");

const GallerySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Gallery = model("Gallery", GallerySchema, "galleries");

module.exports = Gallery;
