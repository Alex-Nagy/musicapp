const mongoose = require("mongoose");

const favLyricsSchema = new mongoose.Schema({
  lyrics: { type: String },
  rate: {type: Number}
});

const FavLyrics = mongoose.model("favLyrics", favLyricsSchema);
module.exports = FavLyrics;
