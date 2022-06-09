const { Schema, SchemaTypes, model } = require("mongoose");

const PostSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  pictureBackup: {
    type: String,
    required: true,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
  },
  date: {
    type: Date,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  gallery: {
    type: SchemaTypes.ObjectId,
    ref: "Gallery",
  },
  hashtags: {
    type: [String],
  },
});

const Post = model("Post", PostSchema, "posts");

module.exports = Post;
