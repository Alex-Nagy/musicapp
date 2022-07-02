const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  artistName: { type: String },
  country: { type: String },
  email: { type: String, unique: true, sparse: true },
  languages: { type: Array },
  genres: { type: Array },
});

const User = mongoose.model("user", userSchema);
module.exports = User;

/*
todos: { type: todoSchema, default: () => [] }, // empty list is default?
*/
