const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: { type: String },
  address: {type: String}
});

const Contacts = mongoose.model("contacts", contactsSchema);
module.exports = Contacts;
