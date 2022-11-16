const express = require("express"),
  cors = require("cors");
var sensorRoutes = require("./../routes/sensors");
var app = express();

app.use(cors());

app.use("/pi/sensors", sensorRoutes);
app.get("/", function (req, res) {
  res.send("You have accessed the root");
});
app.get("/pi", function (req, res) {
  res.send("You have entered the pi");
});

module.exports = app;
// I have looked through all files
