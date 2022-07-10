require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");
const User = require("./model/user");
const FavLyrics = require("./model/favLyrics");
const Contacts = require("./model/contacts");
// const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware on every request

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

//*_____PROFILE_____*
app.post("/api/profile/create", async (req, res) => {
  // if (!req.body?.artistName) return res.sendStatus(400);
  try {
    const user = await User.create({
      userID: req.body.userID,
      artistName: req.body.artistName,
      country: req.body.country,
      email: req.body.email,
      languages: req.body.languages,
      genres: req.body.genres,
      collab: req.body.collab,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/profile/update", async (req, res) => {
  // if (!req.body?.artistName) return res.sendStatus(400);
  try {
    const user = await User.findOneAndUpdate(
      { userID: req.body.userID },
      {
        artistName: req.body.artistName,
        country: req.body.country,
        email: req.body.email,
        languages: req.body.languages,
        genres: req.body.genres,
        collab: req.body.collab,
      }
    );
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});
//todo: GET profile

//*_____USERS_____*
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//*_____CONTACTS______
app.post("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contacts.create({
      artistName: req.body.artistName,
      country: req.body.country,
      email: req.body.email,
    });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//*_____LYRICS_______
app.post("/api/lyrics", async (req, res) => {
  try {
    const favLyrics = await FavLyrics.create({
      lyrics: req.body.lyrics,
      rate: req.body.rate,
    });
    res.status(200).json({ favLyrics });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/lyrics", async (req, res) => {
  try {
    const favLyrics = await FavLyrics.find();
    res.status(200).json({ favLyrics });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/lyrics/delete", async (req, res) => {
  try {
    const favLyrics = await FavLyrics.findOneAndDelete({
      lyrics: req.body.lyrics,
    });
    res.status(200).json({ favLyrics });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Template is listening on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => console.log(error));
