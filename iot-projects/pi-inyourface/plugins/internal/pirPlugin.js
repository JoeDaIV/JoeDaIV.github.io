const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;
pirPlugin.start({})
let sensor;
const device = resources.pi.sensors.pir;

pirPlugin.stop({})