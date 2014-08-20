console.log("SCRIPT: START");
var http = require('http');
var Galileo = require("galileo-io");
var board = new Galileo();

board.on("ready", function boardReadyHandler() {
    console.log("boardReadyHandler(): START");
    
    console.log("boardReadyHandler(): Setting an interval to call IOT Engine every 1000ms");
    var iotEngineInterval = setInterval(callIOTEngineLogger, 1000);
    
    console.log("boardReadyHandler(): END");
});

function callIOTEngineLogger(){
    console.log("callIOTEngineLogger(): START");
    var options = {
        hostname: 'spicr.net',
        port: 80,
        path: '/iot_engine/iot_request.php?DID=GALILEOJN01&CMD=LOG&USR=ROOT&PWD=&G01M=OUTPUT&G02M=OUTPUT&G03M=OUTPUT&G04M=OUTPUT&G05M=OUTPUT&G06M=OUTPUT&G07M=OUTPUT&G08M=OUTPUT&G09M=OUTPUT&G10M=OUTPUT&G11M=OUTPUT&G12M=OUTPUT&G13M=OUTPUT&G01V=0&G02V=0&G03V=0&G04V=0&G05V=0&G06V=0&G07V=0&G08V=0&G09V=0&G10V=0&G11V=0&G12V=0&G13V=0&A0M=OUTPUT&A0V=0&A1M=OUTPUT&A1V=0&A2M=OUTPUT&A2V=0&A3M=OUTPUT&A3V=0&A4M=OUTPUT&A4V=0&A5M=OUTPUT&A5V=0',
        method: 'GET'
    };    
    
    console.log(options);

    var httpRequest = http.request(options, function requestHandler(response) {
        console.log("requestHandler(): START");
        
        response.setEncoding('utf8');
        response.on('data', function responseDataHandler(chunk) {
            console.log("responseDataHandler(): START");
            var response = JSON.parse(chunk);
            console.log(response);
            console.log("responseDataHandler(): END");
        });

        httpRequest.on('error', function errorHandler(e) {
            console.log('errorHandler() - problem with request: ' + e.message);
        });
        console.log("requestHandler(): END");
    });
    
    console.log("callIOTEngineLogger(): END");
}

console.log("SCRIPT: END");

