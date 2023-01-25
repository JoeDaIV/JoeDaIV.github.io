const express = require("express"),
  router = express.Router(),
  resources = require("./../resources/model");
ledsPlugin = require("./../plugins/internal/ledsPlugin");
0 -
  router.route("/").get(function (req, res, next) {
    req.result = resources.pi.actuators;
    next();
  });

router.route("/leds").get(function (req, res, next) {
  req.result = resources.pi.actuators.leds;
  next();
});

router.route("/leds").get(function (req, res, next) {
  req.result = resources.pi.actuators.leds;
  next();
});

module.exports = router;

