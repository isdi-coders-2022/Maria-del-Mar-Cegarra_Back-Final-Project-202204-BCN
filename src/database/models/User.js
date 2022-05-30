const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  followers: {
    type: Number,
    default: 0,
    required: false,
  },
  following: {
    type: Number,
    default: 0,
    required: false,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
