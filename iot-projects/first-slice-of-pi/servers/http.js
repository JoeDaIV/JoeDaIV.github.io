const express = require("express"),
mid = require('./../middleware/converter'),
bodyParser = require('body-parser'),
  cors = require("cors");
var sensorRoutes = require("./../routes/sensors");
var app = express();
app.use(converter());
var actuatorRoutes = require('./../routes/actuators');

app.use(cors());
app.use(bodyParser.json());
app.use("/pi/actuators", actuatorRoutes);
app.use("/pi/sensors", sensorRoutes);
app.get("/", function (req, res) {
  res.send("You have accessed the root");
});
app.get("/pi", function (req, res) {
  res.send("You have entered the pi");
});


module.exports = app;
// I have looked through all files
