const { start } = require('./plugins/internal/ledsPlugin');
const httpServer = require('./servers/http'),
	resources = require('./resources/model');
	ledsPlugin = require('./../plugins/internal/ledsPlugin');
	start();
	

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	process.exit();
});
stop();