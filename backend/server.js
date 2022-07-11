require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");
const User = require("./model/user");
const FavLyrics = require("./model/favLyrics");
// const Contacts = require("./model/contacts");
// const morgan = require("morgan");

//?🔽------------------Swagger--------------------
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Music App API",
      description: "API documentation for the Music App",
      contact: {
        name: "Alex-Nagy",
      },
      servers: ["http://localhost:8080"],
    },
  },
  apis: ["server.js"],
};
//?🔼-------------------Swagger--------------------

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware on every request

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /login:
 *     post:
 *       summary: Log in user, and add to Database
 *       description: Log in user with Spotify
 *       operationId: "addUse"
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "code"
 *         description: "Auth code needed to login"
 *         required: true
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */

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

/**
 * @swagger
 * /lyrics:
 *     get:
 *       summary: 
 *       description: Get lyrics of a selected track
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "query"
 *         name: "artist"
 *         description: "selected artist"
 *         required: false
 *       - in: "query"
 *         name: "track"
 *         description: "selected track"
 *         required: false
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

/**
 * @swagger
 * /api/profile/create:
 *     post:
 *       summary:
 *       description: Create user in Database
 *       operationId: "addUser"
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "userID"
 *         type: Number
 *         description: "Need a unique ID"
 *         required: true
 *       - in: "body"
 *         name: "artistName"
 *         description: "Your artist name to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "country"
 *         description: "Your country to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your email to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your spoken languages to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your favorit music genres to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "collab"
 *         description: "Open to collab status to be displayed in database"
 *         required: false
 *         type: Boolean
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
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
/**
 * @swagger
 * /api/profile/update:
 *     post:
 *       summary: update user profile data in DB
 *       description: update user profile in Database
 *       operationId: "updateUser"
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "userID"
 *         type: Number
 *         description: "Need ID to select which user to update"
 *         required: true
 *       - in: "body"
 *         name: "artistName"
 *         description: "Your artist name to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "country"
 *         description: "Your country to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your email to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your spoken languages to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Your favorit music genres to be displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "collab"
 *         description: "Open to collab status to be displayed in database"
 *         required: false
 *         type: Boolean
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
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
/**
 * @swagger
 * /api/users:
 *     get:
 *       summary: all users profile data in DB
 *       description: all users profile in Database
 *       operationId: "allUser"
 *       consumes:
 *       - "application/json"
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
//*_____USERS_____*
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/contacts:
 *     post:
 *       summary: save a user to your contacts
 *       description: save a user to your contacts list in DB
 *       operationId: "addContact"
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "myID"
 *         type: Number
 *         description: "Need myID to find my profile and add contact there"
 *         required: true
 *       - in: "body"
 *         name: "userID"
 *         type: Number
 *         description: "Need ID to select which user to add"
 *         required: true
 *       - in: "body"
 *         name: "artistName"
 *         description: "Artist name displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "country"
 *         description: "Country displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "email"
 *         description: "Email displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "languages"
 *         description: "Spoken languages displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "genres"
 *         description: "Favorite music genres displayed in database"
 *         required: false
 *       - in: "body"
 *         name: "collab"
 *         description: "Open to collab status to be displayed in database"
 *         required: false
 *         type: Boolean
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
//*_____CONTACTS______
app.post("/api/contacts", async (req, res) => {
  try {
    const contacts = await User.findOneAndUpdate(
      { userID: req.body.myID },
      {
        $push: {
          contacts: {
            userID: req.body.userID,
            artistName: req.body.artistName,
            country: req.body.country,
            email: req.body.email,
            languages: req.body.languages,
            genres: req.body.genres,
            collab: req.body.collab,
            instruments: req.body.instruments,
          },
        },
      }
    );
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/contacts:
 *     get:
 *       summary: get all of your saved contacts
 *       description: save a user to your contacts list in DB
 *       operationId: "getContact"
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
app.get("/api/contacts", async (req, res) => {
  try {
    const me = await User.findOne({ userID: req.query.userID });
    res.status(200).json(me.contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/contacts/delete:
 *     post:
 *       summary: delete a user from your contacts
 *       description: delete a user your contacts list in DB
 *       operationId: "addContact"
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "myID"
 *         type: Number
 *         description: "Need myID to find my profile and delete contact there"
 *         required: true
 *       - in: "body"
 *         name: "userID"
 *         type: Number
 *         description: "Need ID to select which user to delete"
 *         required: true
 *       responses:
 *        '200':
 *          description: Successful response
 *        '400':
 *          description: Failed request
 *        '500':
 *          description: Failed request
 *        '401':
 *          description: Failed request
 */
app.post("/api/contacts/delete", async (req, res) => {
  try {
    const contacts = await User.findOneAndUpdate(
      { userID: req.body.myID },
      {
        $pull: {
          contacts: {
            userID: req.body.userID,
          },
        },
      }
    );
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
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Template is listening on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => console.log(error));
