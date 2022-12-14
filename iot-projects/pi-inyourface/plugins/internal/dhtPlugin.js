const resources = require('./../../resources/model');
const sensorDriver = require('node-dht-sensor');
dhtPlugin.start({})
let interval, sensor;
const device = resources.pi.sensors.dht;
let localParams = {'frequency': 2000};
pirPlugin.start({})
