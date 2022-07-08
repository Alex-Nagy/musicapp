const mongoose = require("mongoose");

const myListSchema = new mongoose.Schema({
  instrument: { type: String },
  level: { type: Number },
});

const MyList = mongoose.model("myList", myListSchema);
module.exports = MyList;