const { start } = require('./plugins/internal/ledsPlugin');
const httpServer = require('./servers/http'),
	resources = require('./resources/model');
	ledsPlugin = require('./../plugins/internal/ledsPlugin');
	
pirPlugin.start({});
dhtPlugin.start({'frequency': 2000});

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	pirPlugin.stop();
	dhtPlugin.stop();
	process.exit();
});
