const mongoose = require("mongoose");
// const Instruments = require("./instruments").schema;
// const FavLyrics = require("./favLyrics").schema;
// const Contacts = require("./contacts").schema;

const instrumentSchema = new mongoose.Schema({
  instrument: { type: String },
  level: { type: Number },
});

const favLyricsSchema = new mongoose.Schema({
  lyrics: { type: String },
  rate: {type: Number}
});

const contactsSchema = new mongoose.Schema({
  userID: { type: Number, unique: true, sparse: true },
  artistName: { type: String },
  country: { type: String },
  email: { type: String, unique: true },
  languages: { type: Array },
  genres: { type: Array },
  collab: { type: Boolean, default: false },
  instruments: [instrumentSchema]
});

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  artistName: { type: String },
  country: { type: String },
  email: { type: String, unique: true },
  languages: { type: Array },
  genres: { type: Array },
  collab: { type: Boolean, default: false },
  instruments: [instrumentSchema],
  favLyrics: [favLyricsSchema],
  contacts: [contactsSchema],
  // regDate: { type: Date.now },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
