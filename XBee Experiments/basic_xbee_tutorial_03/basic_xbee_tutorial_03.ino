int readcount = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial1.begin(9600);
  Serial.println("BEGIN"); 
  delay(3000);
  Serial.println("Setup Complete! Going to Loop()");
}

void loop() {
  int availableValues = Serial1.available();
  if (availableValues > 21) {
    readcount ++;
    Serial.print("Reading Number ");
    Serial.print(readcount);
    Serial.print(" :: ");
    for (int i=0; i<30; i++) {
      byte x = Serial1.read();
      //Serial1.print(x,HEX);
      Serial.print(x,HEX);
      Serial.print(", ");
    }
    Serial.print(millis());
    Serial.println("OK |");
  }
}
