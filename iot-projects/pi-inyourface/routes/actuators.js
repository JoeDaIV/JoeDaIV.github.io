const express = require("express"),
  router = express.Router(),
  resources = require("./../resources/model");
  ledsPlugin = require('./../plugins/internal/ledsPlugin');0-
router.route("/").get(function (req, res, next) {
  res.send(resources.pi.sensors);
});
router.route("/leds").get(function (req, res, next) {
  res.send(resources.pi.sensors);
});
router.route('/leds/:id').get().put();
ledsPlugin.switchOnOff[req.params.id](req.body.value);
next();
module.exports = router;




//router.route("/leds/:id").get) {
 // res.send(resources.pi.actuators.leds[req.params.id]);
//});