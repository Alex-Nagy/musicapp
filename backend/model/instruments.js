const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  instrument: { type: String },
  level: { type: Number },
});

const Instruments = mongoose.model("instrument", instrumentSchema);
module.exports = Instruments;
