const mongoose = require("mongoose");
const Instruments = require("./instruments").schema;
const FavLyrics = require("./favLyrics").schema;
const Contacts = require("./contacts").schema;
// const MyList = require("./myList")

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  artistName: { type: String },
  country: { type: String },
  email: { type: String, unique: true },
  languages: { type: Array },
  genres: { type: Array },
  collab: { type: Boolean, default: false },
  instruments: [Instruments],
  favLyrics: [FavLyrics],
  contacts: [Contacts],
  // regDate: { type: Date.now },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
