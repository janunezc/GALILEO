/*------------------------------------------------------------------------------*/
/* MAP BOARD PINS TO SEGMENTS (a-p and monitor)*/
int _a = 8;
int _b = 9;
int _c = 11;
int _d = 12;
int _e = 13;
int _f = 7;
int _g = 6;
int _p = 10;
int monitor = 5;

/*------------------------------------------------------------------------------*/
/*     ALPHABET SEGMENT ARRAYS

        -      a
       | |   f   b
        -      g
       | |   e   c
        - .    d  p
  
  */
int zero[] = {7,_a,_b,_c,_d,_e,_f,_p};//ABCDEFP
int one[] = {2,_b,_c}; //BC
int two[] = {5,_a,_b,_d,_e,_g};//ABDEG
int three[] = {5,_a,_b,_c,_d,_g};//ABCDG
int four[] = {4,_b,_c,_f,_g};//FGBC
int five[] = {5,_a,_c,_d,_f,_g};//ACDFG
int six[] = {6,_a,_c,_d,_e,_f,_g};//ACDEFG
int seven[] = {3,_a,_b,_c};//ABCG
int eight[] = {8,_a,_b,_c,_d,_e,_f,_g,_p};//ABCDEFGP
int nine[] = {6,_a,_b,_c,_d,_f,_g};//ABCDG

int a_letter[] = {6,_a,_b,_c,_e,_f,_g};//ABCDFGP
int b_letter[] = {5,_c,_d,_e,_f,_g};//CDEFG
int c_letter[] = {4,_a,_d,_e,_f};//ADEF
int d_letter[] = {5,_b,_c,_d,_e,_g};//BCDEG
int e_letter[] = {5,_a,_d,_e,_f,_g};//ADEFG
int f_letter[] = {4,_a,_e,_f,_g};//AEFG

/*------------------------------------------------------------------------------*/
void monitorSignal(){
  for (int i=0; i<3; i++){
    digitalWrite(monitor, HIGH);  delay(500);
    digitalWrite(monitor, LOW); delay(500);
  }
}

/*------------------------------------------------------------------------------*/
void clearDisplay(){
  digitalWrite(_a, LOW);
  digitalWrite(_b, LOW);
  digitalWrite(_c, LOW);
  digitalWrite(_d, LOW);
  digitalWrite(_e, LOW);
  digitalWrite(_f, LOW);
  digitalWrite(_g, LOW);
  digitalWrite(_p, LOW);
}

/*------------------------------------------------------------------------------*/
void printBasedOnArray(int pinsArray[]){
  clearDisplay();
  int elementsCount = pinsArray[0];
 
  for(int i = 1; i<=elementsCount; i++){
    digitalWrite(pinsArray[i], HIGH);
  }
}

/*------------------------------------------------------------------------------*/
void print_0(){
  //ABCDEF
  clearDisplay();
  digitalWrite(_a, HIGH);
  digitalWrite(_b, HIGH);
  digitalWrite(_c, HIGH);
  digitalWrite(_d, HIGH);
  digitalWrite(_e, HIGH);
  digitalWrite(_f, HIGH);
}


void printNumber(int numberToPrint){
  switch(numberToPrint){
    case 0: 
      printBasedOnArray(zero);
      break;
    case 1: 
      printBasedOnArray(one);
      break;
    case 2: 
      printBasedOnArray(two);
      break;
    case 3: 
      printBasedOnArray(three);
      break;
    case 4: 
      printBasedOnArray(four);
      break;
    case 5: 
      printBasedOnArray(five);
      break;
    case 6: 
      printBasedOnArray(six);
      break;
    case 7: 
      printBasedOnArray(seven);
      break;
    case 8: 
      printBasedOnArray(eight);
      break;
    case 9: 
      printBasedOnArray(nine);
      break;
    case 10: 
      printBasedOnArray(a_letter);
      break;
    case 11: 
      printBasedOnArray(b_letter);
      break;
    case 12: 
      printBasedOnArray(c_letter);
      break;
    case 13: 
      printBasedOnArray(d_letter);
      break;
    case 14: 
      printBasedOnArray(e_letter);
      break;
    case 15: 
      printBasedOnArray(f_letter);
      break;
    default:
      int unknown[] = {3,_a,_d,_g};
      printBasedOnArray(unknown);

  }
}

/*------------------------------------------------------------------------------*/
void setup() {
   pinMode(_a, OUTPUT);
   pinMode(_b, OUTPUT);
   pinMode(_c, OUTPUT);
   pinMode(_d, OUTPUT);
   pinMode(_e, OUTPUT);
   pinMode(_f, OUTPUT);
   pinMode(_g, OUTPUT);
   pinMode(_p, OUTPUT);
   pinMode(monitor, OUTPUT);
}

/*------------------------------------------------------------------------------*/
void loop() {
   /*DUMB ZERO PRINT*/
   monitorSignal();
   print_0();
   monitorSignal();   
   clearDisplay(); delay(500);

   /*COUNT USING ARRAYS*/
   for (int i=0; i<16; i++){
     printNumber(i); delay(500);
   }

   monitorSignal();   
   
   /*TEST TO DISPLAY A VALUE IN A VARIABLE */
   int simpleArray[] = {1,2,3,4,5,6,7};//,8,9,10,11,12,13,14,15,16,17,18,19};
   int sizeOfSimpleArray = sizeof(simpleArray) / sizeof(simpleArray[0]);
   printNumber(sizeOfSimpleArray); delay(500);
   monitorSignal();
   
   /*TEST TO DISPLAY A VALUE IN A VARIABLE */
   unsigned long time1 = micros();
   //unsigned long time2 = micros();
   int diff = micros()-time1;
   printNumber(diff); //delay(1000);
   monitorSignal();
   clearDisplay();
 
}





