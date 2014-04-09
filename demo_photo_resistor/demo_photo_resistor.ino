int val = 0;          // This variable will be used to measure the light sensor value. We will use A0 port for this experiment.
int blink_led_dp_13 = 13; // Will indicate when the system will start to run.
int trans_base = 8; // This variable will control the transistor and activate the relay when required.
int relay = 7; 
int warning = 4; // This pin will protect the system from photocell malfunction.

void setup() {
Serial.begin(9600); // Ini
setPinModes();
blinkSignal();
setpin_ini();
}

void loop(){
  val = analogRead(0);// Asigns the sensor value in A0 to the variable.
  Serial.println(val);// Prints the value in the Serial Port

if (val >200 and val <400)  digitalWrite(trans_base, HIGH),digitalWrite (warning, LOW); // If the sensor outcome is higher than 300 and less than 610, then activates the transistor and disable the warning pin. 
  else digitalWrite(trans_base, LOW);

if (val > 400)  digitalWrite(trans_base, HIGH), digitalWrite (warning, HIGH); // If the sensor outcome is higher than 610, then deactivates the transistor and activates the protection using the warning pin. 
  
  }
  
void setPinModes(){
  /*SET PINS AS OUTPUTS */
  pinMode(blink_led_dp_13, OUTPUT);
  pinMode(trans_base, OUTPUT);
  pinMode(relay, OUTPUT);
   pinMode(warning, OUTPUT);
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
  /*SET PINS INITIAL VALUES */

void setpin_ini() {
  digitalWrite(trans_base, LOW);
  digitalWrite(relay, LOW);
  digitalWrite(warning, LOW);
  
}
