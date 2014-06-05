#include <Servo.h>
#include <Wire.h>
#define ECHOPIN		 7
#define TRIGGERPIN	 6
#define US_ROUNDTRIP_IN 146     
#define US_ROUNDTRIP_CM 57      
//#define NewPingConvert(echoTime, conversionFactor) (max((echoTime + conversionFactor / 2) / conversionFactor, (echoTime ? 1 : 0)))
#define PingConvert(echoTime, conversionFactor) ((echoTime + conversionFactor / 2) / conversionFactor) 
unsigned long pinStart;
unsigned long pinEnd;

void setup()
{
  Serial.begin(9600);
  pinMode(TRIGGERPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);
}

void loop()
{
  digitalWrite(TRIGGERPIN,LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGGERPIN,HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGERPIN,LOW);
  
  while(digitalRead(ECHOPIN)==LOW){}; //waiting for the pin to trigger
  pinStart = micros();
  while(digitalRead(ECHOPIN)==HIGH){};//waiting for the pin to go low
  pinEnd = micros();
  
  unsigned int echoTime = pinEnd - pinStart;
  Serial.print("distance=");
  Serial.println(PingConvert(echoTime, US_ROUNDTRIP_IN));
  delay(1000); 
}
