const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

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
  console.log("HOME woking");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;

/*

*/