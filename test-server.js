const http = require("http");
const port = 8787;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Roronoa ');
    res.write(" NANI!? ")
    res.end('ZORO!!');
  
}).listen(port);