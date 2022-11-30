const express = require("express"),
  router = express.Router(),
  resources = require("./../resources/model");
router.route("/").get(function (req, res, next) {
  req.result = resources.pi.sensors;
});
router.route("/leds").get(function (req, res, next) {
  req.result = resources.pi.sensors;
});
router.route("/leds/:id").get(function (req, res, next) {
  req.result = resources.pi.actuators.leds[req.params.id];
});

module.exports = router;
