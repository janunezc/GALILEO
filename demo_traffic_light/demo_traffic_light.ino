// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
int led_blanco = 13;
int led_verde = 12;
int led_amarillo = 11;
int led_rojo = 10;

// the setup routine runs once when you press reset:
void setup() {                
  // initialize the digital pin as an output.
  pinMode(led_blanco, OUTPUT);     
  pinMode(led_verde, OUTPUT);  
  pinMode(led_amarillo, OUTPUT);  
  pinMode(led_rojo, OUTPUT);  
  
  digitalWrite(led_blanco, LOW);
  digitalWrite(led_verde, LOW);
  digitalWrite(led_amarillo, LOW);
  digitalWrite(led_rojo, LOW);
  
  startSignal();
  
  
}

// the loop routine runs over and over again forever:
void loop() {
  
  digitalWrite(led_verde, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(20000);  
  quickBlinkSignal();

  digitalWrite(led_verde, LOW);   // turn the LED on (HIGH is the voltage level)
  digitalWrite(led_amarillo, HIGH);   // turn the LED on (HIGH is the voltage level)  
  delay(5000);
  quickBlinkSignal();
 
  digitalWrite(led_amarillo, LOW);   // turn the LED on (HIGH is the voltage level) 
  digitalWrite(led_rojo, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(10000);               // wait for a second
  quickBlinkSignal();  
  
  digitalWrite(led_rojo, LOW);   // turn the LED on (HIGH is the voltage level)
}

void startSignal(){
  digitalWrite(led_blanco, HIGH); delay(500);
  digitalWrite(led_blanco, LOW); delay(500);
  digitalWrite(led_blanco, HIGH); delay(500);
  digitalWrite(led_blanco, LOW); delay(500);
  digitalWrite(led_blanco, HIGH); delay(500);
  digitalWrite(led_blanco, LOW); delay(500);
}

void quickBlinkSignal(){
  digitalWrite(led_blanco, HIGH); delay(100);
  digitalWrite(led_blanco, LOW); delay(100);
  digitalWrite(led_blanco, HIGH); delay(100);
  digitalWrite(led_blanco, LOW); delay(100);
  digitalWrite(led_blanco, HIGH); delay(100);
  digitalWrite(led_blanco, LOW); delay(100);  
}
