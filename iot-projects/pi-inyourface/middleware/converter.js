const json2html = require('node-json2html');
let transform = {'<>': 'div', 'html': [
	{'<>': 'p', 'html': [
		{'<>': 'h1', 'html': 'name: '},
		{'<>': 'p', 'html': '${name}'}
	]},
	{'<>': 'p', 'html': [
		{'<>': 'h1', 'html': 'description: '},
		{'<>': 'p', 'html': '${description}'}
	]},
	{'<>': 'p', 'html': [
		{'<>': 'h1', 'html': 'value: '},
		{'<>': 'p', 'html': '${value}'}
	]}
]};
module.exports = function() {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) {}
		next();
		if (req.accepts('html')){}
		json2html.transform(result, transform);
		res.send();
		res.send(req.result);
	};
};
