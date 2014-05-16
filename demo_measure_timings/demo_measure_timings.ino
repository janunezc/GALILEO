void setup() {
    pinMode(11,OUTPUT);
    pinMode(3, OUTPUT);
}

long timing = 0;
void loop() {
        
    Serial.println("-------- BEGIN  LOOP --------");  
  
    Serial.println("Measuring ReadDigital() on pin 11");
    timing = measureReadDigital(11);
    Serial.println(timing);
    

    Serial.println("Measuring ReadDigital() on pin 3");
    timing = measureReadDigital(3);
    Serial.println(timing);
    
    Serial.println("Measuring AnalogRead() on A0");
    timing = measureAnalogRead(A0);
    Serial.println(timing);    
    
    Serial.println("Measuring VAR Declaration (int)");
    timing = measureVarDeclaration();
    Serial.println(timing);        

    Serial.println("-------- END  LOOP --------");  
    delay(3000);
  
}

long measureVarDeclaration (){
  int val = 0;
  long diff = 0;
  long initialTime = 0;
  /*-----------------*/
  initialTime = micros();
  int newvar;
  return micros() - initialTime;
}

long measureReadDigital (int pin){
  int val = 0;
  long diff = 0;
  long initialTime = 0;
  /*-----------------*/
  initialTime = micros();
  val = digitalRead(pin);
  return micros() - initialTime;
}

long measureAnalogRead (int pin){
  int val = 0;
  long diff = 0;
  long initialTime = 0;
  /*-----------------*/
  initialTime = micros();
  val = analogRead(A3);
  diff = micros() - initialTime;
  /*-----------------*/
  
  Serial.println(val);
  return diff;
}
