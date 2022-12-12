// requestServer.js file
const http = require("http");
const request = require("request");
const port = 1060;
var args = process.argv.slice(2);

http.createServer(function(req, res){
// example request call
var url = args[0] ? args[0] : "https://joedaiv.github.io/";
request(url, function(error, response, body){
    if (!body || !response || (error === null && response.statusCode !== 200)){
        res.end("bad URL\n");
        return;
    }
    if (response.statusCode === 200 && !error === true){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(body);
    }
    else {
        res.writeHead(response.statusCode, {'Content-Type': 'text/plain'});
        error.toString("404 error");
    }
    res.end("Absoulutely not");
})
}).listen(1060);
