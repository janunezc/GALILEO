var http = require('http');
var ipaddress = '172.20.10.12';
http.createServer(function(req, res) {
    console.log("Request Received!");
    console.log(req);
    console.log(res);
    var url = req.url;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World <a href="?Clicked">Click Me!</a>' + url);

}).listen(1337, ipaddress);

console.log('Server running at http://' + ipaddress + ':1337');