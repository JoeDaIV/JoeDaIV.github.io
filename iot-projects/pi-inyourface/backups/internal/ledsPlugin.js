const { exit } = require('process');
const resources = require('./../../resources/model');

let actuator1, actuator2;
let model = resources.pi.actuators.leds;
let pluginName = resources.pi.actuators.leds[1].name + ", " + resources.pi.actuators.leds[2].name;
const Gpio = require('onoff').Gpio;
exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

// TODO 1: Complete the ledsPlugin!
function connectHardware(){
	sensor.watch(function (err, value) {
		if (err) exit(err);
	})
	model[1].gpio(40, 'out');
	model[2].gpio(36, 'out');
}
function stop(){
	LEDGpioConnection.write(0);
	LEDGpioConnection.write(0);
	sensor.unexport(36);
	sensor.unexpexted(40);
}
exports.switchOnOff = {
    1: function (value) {
		LEDGpioConnection.write(1)(value ? "true" : "false");
		LEDGpioConnection.write(0)(value ? "true" : "false");
    },
    2: function (value) {
        // turn LED 2 on or off based on value
		LEDGpioConnection.write(1)(value ? "true" : "false");
		LEDGpioConnection.write(0)(value ? "true" : "false");
    }
}
