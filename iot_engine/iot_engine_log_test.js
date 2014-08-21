var Galileo = require("galileo-io");
var board = new Galileo();

board.on("ready", function() {
    var byte = 0;
    //this.pinMode(13, this.MODES.OUTPUT);
    this.pinMode(9, this.MODES.INPUT);
    console.log("pinmode set!");

    //console.log("blink!");
    //board.digitalWrite(13, (byte ^= 1));
    var value9 = board.digitalRead(9);
    console.log("Value 9: " + value9);
});