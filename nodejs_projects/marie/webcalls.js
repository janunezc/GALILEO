var http = require('http');
var Galileo = require("galileo-io");

var board = new Galileo();
var delayTime = 1000;
var targetPin = 9;

var intervalHandler;
var byte = 0;


var intervalFunction = function() {
    console.log("Interval Reached - " + byte + " - " + delayTime);
    board.digitalWrite(targetPin, (byte ^= 1));
};

function ajaxCall() {
    console.log("ajaxCall() reached");
    var options = {
        hostname: 'spicr.net',
        port: 80,
        path: '/iotest.json',
        method: 'GET'
    };

    console.log(options);

    var req = http.request(options, function(res) {
        console.log("GOOD: http.request function");

        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log("res.on function reached");
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
    console.log("ajaxCall() ended");
}


board.on("ready", function() {
    ajaxCall();
    console.log("Ready Function Reached!");
    this.pinMode(targetPin, this.MODES.OUTPUT);
    intervalHandler = setInterval(intervalFunction, delayTime);
});


http.createServer(function(req, res) {
    console.log("Request Received!");
    var url = req.url;

    clearInterval(intervalHandler);

    console.log("Current Delay Time: " + delayTime);
    if (delayTime > 200)
        delayTime = delayTime - 200;
    else
        delayTime = 1000;

    console.log("New Delay Time:" + delayTime);


    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n' + url);

    intervalHandler = setInterval(intervalFunction, delayTime);


}).listen(1337, '169.254.1.1');

console.log('Server running at http://169.254.1.1:1337');
