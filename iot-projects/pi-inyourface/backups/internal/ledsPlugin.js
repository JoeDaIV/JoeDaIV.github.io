const { exit } = require("process");
const resources = require("./../../resources/model");

let actuator1, actuator2;
let model = resources.pi.actuators.leds;
let pluginName =
  resources.pi.actuators.leds[1].name +
  ", " +
  resources.pi.actuators.leds[2].name;
const Gpio = require("onoff").Gpio;
exports.start = function (params) {
  connectHardware();
  console.log("starting " + pluginName + " plugin");
};

// TODO 1: Complete the ledsPlugin!
function connectHardware() {
  sensor.watch(function (err, value) {
    if (err) exit(err);
  });
  actuator1 = new Gpio(model[1].gpio, "out");
  actuator2 = new Gpio(model[2].gpio, "out");
}
exports.stop = function (params) {
  actuator1.write(0);
  actuator2.write(0);
  actuator1.unexport();
  actuator2.unexport();
};
exports.switchOnOff = {
  1: function (value) {
    actuator1.write(value ? 1 : 0);
  },
  // turn LED 2 on or off based on value
  2: function (value) {
    actuator2.write(value ? 1 : 0);
  },
};
exports.start;
