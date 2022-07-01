const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const SpotifyWebApi = require("spotify-web-api-node");

morgan.token("host", function (req, res) {
  return req.hostname;
});

app.use(cors());
app.use(express.json()); // body-ban erkezo json-t parse-olni tudja
app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware on every request, nice logs

const dashboardRoutes = require("./route/dashboard");
app.use("/api/dashboards", dashboardRoutes);
const userRoutes = require("./route/user.js");
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  console.log("HOME working");
  res.sendStatus(200);
});

// spotifyWebApi
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "d4057ca6c39b408496e9a83ecabe4b4a",
    clientSecret: "0b57a0786e4f4cf0b7d09cdbbee3f6e6",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "d4057ca6c39b408496e9a83ecabe4b4a",
    clientSecret: "0b57a0786e4f4cf0b7d09cdbbee3f6e6",
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
    .catch(() => {
      res.sendStatus(400);
    });
});

app.use(errorHandler);

module.exports = app;
