/*
  Shift Register Sample
  
    Operates a Shift Register 74HC595N to light leds in order one by one.
    
 */
 
int blink_led_dp_13 = 13; /* BLUE:   I use this LED to show a start and end point in the program. */
int _reset_10 = 10;       /* WHITE:  Performs a high-low to reset contents of the SR */

int shift_clock_11 = 8;  /* YELLOW: Performs a H-L to shift contents of the register and fetch the data present in DATA SERIAL PIN*/
                          /*NOTICE!!!
                          WHEN PWM PORT IS USED HERE (11 FOR INSTANCE) THE SHIFT REGISTER IC MAY GET MORE THAN ONE SHIFT EXECUTIONS PER L-H-L TRANSITION... WHICH SOUNDS LIKE A BUG SOMEWHERE. USE PIN 8 (NON PWM)
                          FORM MORE ACCURATE RESULTS.
                          */

int latch_clock_12 = 12;  /* BLUE:  Performs a H-L to update Parallel Outputs with serial contents*/

int data_serial_14_9 = 9;   /*ORANGE:    H or L should be present in the pin 14 of the IC when Shift-Clock is actuated. */

int signalDelay = 10; /*DELAY BETWEEN SIGNAL CHANGES TO GIVE THE CHIP TIME TO REACT */

void setup() {    

  setPinModes();
}

// the loop routine runs over and over again forever:
void loop() {
  
  blinkSignal();
    
  /*FIRST OF ALL - RESET THE CHIP */
  resetRegisterControls();
  resetRegister();  
  
  /*Inject bits into the register*/
  injectBit(HIGH);//1
  injectBit(HIGH);//2
  injectBit(HIGH);//3
  injectBit(HIGH);//4
  injectBit(HIGH);//5
  injectBit(HIGH);//6
}

void setPinModes(){
  /*SET PINS AS OUTPUTS */
  pinMode(blink_led_dp_13, OUTPUT);
  pinMode(_reset_10 , OUTPUT); /*LOW DOES RESET, HIGH ENABLES*/    
  pinMode(shift_clock_11 , OUTPUT);  /*HIGH SHIFTS*/
  pinMode(latch_clock_12 , OUTPUT); /*HIGH Stores*/
  pinMode(data_serial_14_9 , OUTPUT); /*PUT 1 or 0 just before setting latch_clock_12 to HIGH*/ 
}
void blinkSignal(){
  /*INDICATES ROUTINE START*/
  digitalWrite(blink_led_dp_13, HIGH); delay(100);
  digitalWrite(blink_led_dp_13, LOW); delay(1000);
  digitalWrite(blink_led_dp_13, HIGH); delay(100);
  digitalWrite(blink_led_dp_13, LOW); delay(1000);
  digitalWrite(blink_led_dp_13, HIGH); delay(100);
  digitalWrite(blink_led_dp_13, LOW); delay(1000);  
}

void resetRegisterControls(){
  /*LETS BEGIN BY PUTTING CONTROL SIGNALS IN LOW*/  
  digitalWrite(_reset_10, HIGH);
  digitalWrite(shift_clock_11, LOW);
  digitalWrite(latch_clock_12, LOW); 
  digitalWrite(data_serial_14_9, LOW);
  analogWrite(shift_clock_11, 255); delay(signalDelay); 
  delay(signalDelay);  
}

void resetRegister(){
  digitalWrite(_reset_10, LOW); delay(signalDelay);
  digitalWrite(_reset_10, HIGH); delay (signalDelay);/*END RESET*/
  
  doLatch();
}

void injectBit(boolean bitValue){
  
   /*PLACE A value in the data bit. */
  setDataBit(bitValue);
  
  /*SHIFT CLOCK FOR SHIFT: LOADS DATA BIT INTO THE STREAM SHIFTING ONE STEP */

  doShift();
  
  /*STORE IT: ACTUALLY TAKES THE SERIAL CELL VALUES AND OUTPUTS THEM AS PARALLEL*/    
  doLatch();    
 
}

void setDataBit(boolean bitValue){
  digitalWrite(data_serial_14_9, bitValue);  delay(signalDelay); 
}

void doShift(){
   digitalWrite(shift_clock_11, HIGH); delay(signalDelay); 
   digitalWrite(shift_clock_11, LOW); delay(signalDelay);   
}

void doLatch(){
   digitalWrite(latch_clock_12, HIGH); delay(signalDelay);   
   digitalWrite(latch_clock_12, LOW); delay(signalDelay);   
}
