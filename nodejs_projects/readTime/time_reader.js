var Galileo = require("galileo-io");
var board = new Galileo();
var pinToRead = 9;

board.on("ready", function boardReadyEvent() {
    console.log("Board Ready Function Reached!");
    this.pinMode(pinToRead, this.MODES.INPUT);

    var initialTime = new Date().getTime();
    var endTime = new Date().getTime();
    var minimalDiff = endTime - initialTime;
    var readOpTime;

    var valueRead;

    console.log({ini: initialTime, end: endTime, diff: minimalDiff});

    initialTime = new Date().getTime();
    var iterations = 0;
    board.digitalRead(pinToRead, function readHandler(data){
       iterations ++;
       readOpTime = (new Date().getTime()) - initialTime;
        
       console.log("digitalRead() lasted: " + readOpTime + "ms");
       console.log("value we got was: " + data);     
       initialTime = new Date().getTime();     	  
    });

    console.log("End of BoardReady event");

});