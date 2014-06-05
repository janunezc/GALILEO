var http = require('http');
var Galileo = require("galileo-io");

var board = new Galileo();
var serverIP = '192.168.1.114';
var serverPort = 1337;
var galileoInterval;
var lightInterval;
var targetPin = 9;
var galileoIntervalTime = 2000;
var lightIntervalTime = 1000;
var byte = 0;
var voltage = -1;

board.on("ready", boardReadyHandler);

function galileoLoopHandler() {
    console.log("galileoLoopHandler()");
    ajaxCall();
}

function lightIntervalHandler() {
    board.digitalWrite(targetPin, (byte ^= 1));
}


function boardReadyHandler() {
    console.log("boardReadyHandler(): Ready Function Reached!");
    galileoInterval = setInterval(galileoLoopHandler, galileoIntervalTime);
    var lastValue = -1;
    board.analogRead("A0", function a0ReadHandler(data) {
        lightIntervalTime = data;
        data = Math.ceil((data/1024)*5);
        if (data!==lastValue){
            lastValue = data;
            voltage = data;
            console.log("Analog Read in Pin 0: " + data + " Volts");
        }
        
        // DONT USE THIS UNLESS YOU KNOW WHAT YOURE DOING! board.removeAllListeners("analog-read-0");
    });


}



function ajaxCall() {
    console.log("ajaxCall() reached");
    var options = {
        hostname: 'spicr.net',
        port: 80,
        path: '/iotest.php?voltage=' + voltage,
        method: 'GET'
    };

    var req = http.request(options, function requestHandler(res) {
        console.log("requestHandler() - called!");

//        console.log('STATUS: ' + res.statusCode);
//        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function responseHandler(chunk) {
            console.log("responseHandler() called!");
            var response = JSON.parse(chunk);

            console.log(response);

            switch (response.Value) {
                case "ON":
                    clearInterval(lightInterval);
                    board.digitalWrite(targetPin, 1);
                    break;
                case "OFF":
                    clearInterval(lightInterval);
                    board.digitalWrite(targetPin, 0);
                    break;
                case "BLINK":
                    clearInterval(lightInterval);
                    lightInterval = setInterval(lightIntervalHandler, lightIntervalTime);
                    break;
            }

        });

        req.on('error', function errorHandler(e) {
            //console.log('errorHandler() - problem with request: ' + e.message);
        });
    });



// write data to REQUEST body
    req.write('data\n');
    req.write('data\n');
    req.end();

    console.log("ajaxCall() ended");
}
