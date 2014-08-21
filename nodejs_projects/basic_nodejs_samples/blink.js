logMessage("Script Begins!");
var Galileo = require("galileo-io");
var board = new Galileo();
var pin = 9;
var byte = 0;

/*
 * Contains the logic for when the Galileo Board is Ready
 * @returns {undefined}
 */
function galileoReadyHandler(){
   logMessage("galileoReadyHandler() Begins!");
   this.pinMode(pin, this.MODES.OUTPUT);
   logMessage("Pin was just set as OUTPUT");
   setInterval(intervalHandler, 500);
   logMessage("Interval was just set to 500ms");
}

/*
 * Writes to the designated blink pin toggling between 0 and 1. This function is to be called by an Interval (timer) handler.
 * @returns {undefined}
 */
function intervalHandler(){
   logMessage("intervalHandler() Begins!");
   board.digitalWrite(pin, (byte ^= 1));
   logMessage("digitalWrite() just happened!");
}

/***
 * Logs messages into the console including a milliseconds timestamp
 * @param {type} message
 * @returns {undefined}
 */
function logMessage(message){
   var d = new Date().getTime();
   console.log(d + " - " + message);
}

/***
 * This line sets up the Ready event of the Galileo Board to be handled by galileoReadyHandler function.
 * @param {type} param1
 * @param {type} param2
 */
board.on("ready", galileoReadyHandler);
