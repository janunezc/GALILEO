logMessage("Script Begins!");
var Galileo = require("galileo-io");
var board = new Galileo();
var previousData = 0;

logMessage("Setting Ready event for the Galileo Board");
board.on("ready", galileoReadyHandler);
logMessage("Root Execution Complete!");

/*
 * Contains the logic for when the Galileo Board is Ready
 * @returns {undefined}
 */
function galileoReadyHandler() {
    /***
     * This line sets a Digital Read event handler. Every time the Galileo Board completes a read operation
     * it will call the readHandler function to process it.
     **/
    logMessage("Galileo Ready Handler Begins! - Setting a Digital Read Handler...");
    board.digitalRead(10, readHandler);
    logMessage("Galileo Ready Handler Complete!");
}

/***
 * Receives DATA from a read event and uses it.
 * @param data
 * @returns {undefined}
 */
function readHandler(data) {
    logMessage("Read Handler Begins!");
    if (previousData !== data) {
        logMessage("Data Changed!");
        previousData = data;
        logMessage("New Data: " + data);
    }
}

/***
 * Logs messages into the console including a milliseconds timestamp
 * @param {type} message
 * @returns {undefined}
 */
function logMessage(message) {
    var d = new Date().getTime();
    console.log(d + " - " + message);
}