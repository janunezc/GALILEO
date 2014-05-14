/*
  THIS SKETCH IMPLEMENTS IN THE loop() FUNCTION A CLOCK THAT DOES NOT ACCUMULATE MILLISECONDS BUT TRIES TO KEEP THEM WHITHIN TARGET MILLIS SPECIFICATION.
*/

#define CLOCK_PIN 13//Clock en pin 13

long frequencyInKHz = 5; // Shooting for 5 KHz
long initialMicros = 0;
long lastCutoffMicros = 0;
long nextCutoffMicros = 0;
long t_in_micros = 0;
long toggle_time_in_micros = 0;
int currentSignal = LOW;
int debugMode = 1;

void setup() {
  pinMode(CLOCK_PIN, OUTPUT);
  t_in_micros = (1/(frequencyInKHz * 1000)) * 1000000;
  toggle_time_in_micros = t_in_micros / 2;
  currentSignal = LOW;
  digitalWrite(CLOCK_PIN, currentSignal);
}

void loop() {
  jnck();
  // Depending on requested frequency, more stuff can be executed here while next toggle time is achieved.
  if (debugMode==1) Serial.println(micros());
}


void jnck()
{

  //INITIAL SETUP
  if(lastCutoffMicros == 0){
   lastCutoffMicros = micros(); 
   initialMicros = lastCutoffMicros; //Position in time when the clock started
   nextCutoffMicros = lastCutoffMicros + toggle_time_in_micros;
  }
  
  if(micros() > nextCutoffMicros){ //Cutoff!
    lastCutoffMicros = nextCutoffMicros; //Increase based on static target time that do not accumulate elapsed time
    nextCutoffMicros = nextCutoffMicros + toggle_time_in_micros;
    
    if (currentSignal == HIGH ) currentSignal = LOW; 
    else currentSignal = HIGH; //TOGGLE CLOCK SIGNAL
    
    digitalWrite(CLOCK_PIN, currentSignal);
  }
}

