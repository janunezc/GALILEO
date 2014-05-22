var http = require('http');
var Galileo = require("galileo-io");

var board = new Galileo();
var serverIP = '192.168.1.114';
var serverPort = 1337;
var galileoInterval;
var targetPin = 9;
var galileoIntervalTime = 1000;
var byte = 0;

http.createServer(serverHandler).listen(serverPort, serverIP);

board.on("ready", boardReadyHandler);

function serverHandler(req, res) {
    console.log("serverHandler() - Request Received!");
    var url = req.url;
    console.log(url);

    if (url !== "/favicon.ico") {
        switch(url){
            case "/?command=ON": 
                clearInterval(galileoInterval);
                board.digitalWrite(targetPin, 1);
                break;
            case "/?command=OFF":
                clearInterval(galileoInterval);
                board.digitalWrite(targetPin, 0);            
                break;
            case "/?command=BLINK":
                galileoInterval = setInterval(galileoLoopHandler, galileoIntervalTime);
                break
        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Request Received: ' + url);
    }
}

function galileoLoopHandler() {
    console.log("galileoLoopHandler()");
    board.digitalWrite(targetPin, (byte ^= 1));
}

function boardReadyHandler() {
    console.log("boardReadyHandler(): Ready Function Reached!");
    galileoInterval = setInterval(galileoLoopHandler, galileoIntervalTime);
}


console.log("Server running at http://" + serverIP + ":" + serverPort);