const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  artistName: { type: String },
  country: { type: String },
  email: { type: String, unique: true, sparse: true }
});

const Contacts = mongoose.model("contacts", contactsSchema);
module.exports = Contacts;
