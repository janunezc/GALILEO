console.log("SCRIPT: START");
var http = require('http');
var Galileo = require("galileo-io");
var board = new Galileo();
var iotIntervalTime = 10000;
var deviceData = {};

board.on("ready", function boardReadyHandler() {
    console.log("boardReadyHandler(): START");

    console.log("boardReadyHandler(): Setting an interval to call IOT Engine every 10000ms");
    var iotEngineInterval = setInterval(callIOTEngineLogger, iotIntervalTime);

    console.log("boardReadyHandler(): END");
});

function callIOTEngineLogger() {
    console.log("callIOTEngineLogger(): START");

    console.log(deviceData);

    var queryString = "";
    queryString += "DID=" + deviceData.DID;
    queryString += "&CMD=" + deviceData.CMD;
    queryString += "&USR=" + deviceData.USR;
    queryString += "&PWD=" + deviceData.PWD;
    queryString += "&G01M=" + deviceData.G01M;
    queryString += "&G02M=" + deviceData.G02M;
    queryString += "&G03M=" + deviceData.G03M;
    queryString += "&G04M=" + deviceData.G04M;
    queryString += "&G05M=" + deviceData.G05M;
    queryString += "&G06M=" + deviceData.G06M;
    queryString += "&G07M=" + deviceData.G07M;
    queryString += "&G08M=" + deviceData.G08M;
    queryString += "&G09M=" + deviceData.G09M;
    queryString += "&G10M=" + deviceData.G10M;
    queryString += "&G11M=" + deviceData.G11M;
    queryString += "&G12M=" + deviceData.G12M;
    queryString += "&G13M=" + deviceData.G13M;
    
    queryString += "&G01V=" + deviceData.G01V;
    queryString += "&G02V=" + deviceData.G02V;
    queryString += "&G03V=" + deviceData.G03V;
    queryString += "&G04V=" + deviceData.G04V;
    queryString += "&G05V=" + deviceData.G05V;
    queryString += "&G06V=" + deviceData.G06V;
    queryString += "&G07V=" + deviceData.G07V;
    queryString += "&G08V=" + deviceData.G08V;
    queryString += "&G09V=" + deviceData.G09V;
    queryString += "&G10V=" + deviceData.G10V;
    queryString += "&G11V=" + deviceData.G11V;
    queryString += "&G12V=" + deviceData.G12V;
    queryString += "&G13V=" + deviceData.G13V;
    
    queryString += "&A0M=" + deviceData.A0M;
    queryString += "&A1M=" + deviceData.A1M;
    queryString += "&A2M=" + deviceData.A2M;
    queryString += "&A3M=" + deviceData.A3M;
    queryString += "&A4M=" + deviceData.A4M;
    queryString += "&A5M=" + deviceData.A5M;
    queryString += "&A0M=" + deviceData.A0M;
    queryString += "&A1V=" + deviceData.A1V;
    queryString += "&A2V=" + deviceData.A2V;
    queryString += "&A3V=" + deviceData.A3V;
    queryString += "&A4V=" + deviceData.A4V;
    queryString += "&A5V=" + deviceData.A5V;

    var options = {
        hostname: 'http://spicr.net',
        port: 80,
        path: '/iot_engine/iot_request.php?' + queryString,
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


    httpRequest.write('data\n');
    httpRequest.write('data\n');
    httpRequest.end();

    console.log("callIOTEngineLogger(): END");
}

function readDeviceData(){
    
}

console.log("SCRIPT: END");

