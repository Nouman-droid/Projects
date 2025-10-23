#include <TinyGPS.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

 #include <Wire.h>

#include <Adafruit_Sensor.h> 

#include <Adafruit_ADXL345_U.h>

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();

#include <LiquidCrystal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define heart 13                              

const int rs = 13, en = 12, d4 =14 , d5 = 27, d6 = 26, d7 = 25;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

int data=36;//heartbeat sensor

#include<dht.h>  

#define dht_dpin 15

dht DHT;


unsigned long temp=0;
byte customChar1[8] = {0b00000,0b00000,0b00011,0b00111,0b01111,0b01111,0b01111,0b01111};
byte customChar2[8] = {0b00000,0b11000,0b11100,0b11110,0b11111,0b11111,0b11111,0b11111};
byte customChar3[8] = {0b00000,0b00011,0b00111,0b01111,0b11111,0b11111,0b11111,0b11111};
byte customChar4[8] = {0b00000,0b10000,0b11000,0b11100,0b11110,0b11110,0b11110,0b11110};
byte customChar5[8] = {0b00111,0b00011,0b00001,0b00000,0b00000,0b00000,0b00000,0b00000};
byte customChar6[8] = {0b11111,0b11111,0b11111,0b11111,0b01111,0b00111,0b00011,0b00001};
byte customChar7[8] = {0b11111,0b11111,0b11111,0b11111,0b11110,0b11100,0b11000,0b10000};
byte customChar8[8] = {0b11100,0b11000,0b10000,0b00000,0b00000,0b00000,0b00000,0b00000};


int buzzer=2;
int GREEN=4;
int RED=5;

int SW=23;

int smoke;
int Sensor1;


int count=0;
char mystr[20];

TinyGPS gps;

void getgps(TinyGPS &gps);

char * dtostrf(
  double __val,
  signed char __width,
  unsigned char __prec,
  char * __s);

  
  float latitude, longitude;

void setup() 
{
    Serial.begin(9600);
    Serial2.begin(9600);  
    pinMode(data,INPUT);
    pinMode(SW,INPUT_PULLUP);
    pinMode(RED,OUTPUT);
    pinMode(GREEN,OUTPUT);
    pinMode(buzzer,OUTPUT);

    Serial.begin(9600);
    lcd.begin(16, 2);
    
    lcd.createChar(1, customChar1);
    lcd.createChar(2, customChar2);
    lcd.createChar(3, customChar3);
    lcd.createChar(4, customChar4);
    lcd.createChar(5, customChar5);
    lcd.createChar(6, customChar6);
    lcd.createChar(7, customChar7);
    lcd.createChar(8, customChar8);
    
    Serial.println("AMBULANCE MONITORING SYSTEM");
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Vehicle Tracking");
    lcd.setCursor(0,1);
    lcd.print("   System");
    delay(1000);
    
   if(!accel.begin())
   {

      Serial.println("No valid sensor found");

      while(1);

   }
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("GPS Signal");
    lcd.setCursor(0,1);
    lcd.print("Searching...");
    delay(1000);


}
void ACCELEROMETER()
{
  
    sensors_event_t event; 
    accel.getEvent(&event);
    int X_val=event.acceleration.x;
    int Y_val=event.acceleration.y;
    
    Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
    
    Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
    
    Serial.println("m/s^2 ");
    
    lcd.clear();
    lcd.print("X:");
    lcd.print(X_val);
    lcd.setCursor(0,1);;
    lcd.print("Y:");
    lcd.print(Y_val);
    
    delay(500);

   if((X_val<-5.5)||(X_val>5.5))
   {
      digitalWrite(buzzer,HIGH);
      lcd.clear();
      lcd.print("Accident Detected");
      String one = "$Accident Occured AT:https://www.google.com/maps/?q=";
      String two = "," ;   
      String message = one +latitude +two + longitude+ '#';
      
      // Convert String to char array
      int str_len = message.length() + 1;
      char textmessage[str_len];
      message.toCharArray(textmessage,str_len);
      Serial.println(textmessage);
       Serial2.println(textmessage);
      delay(1000);
      digitalWrite(buzzer,LOW);  
      delay(1000);
   }
   if((Y_val<-5.5)||(Y_val>5.5))
   {
      digitalWrite(buzzer,HIGH); 
      lcd.clear();
      lcd.print("Accident Detected");
      String one = "$Accident Occured AT:https://www.google.com/maps/?q=";
      String two = "," ;   
      String message = one +latitude +two + longitude+ '#';
      
      // Convert String to char array
      int str_len = message.length() + 1;
      char textmessage[str_len];
      message.toCharArray(textmessage,str_len);
      Serial.println(textmessage);
       Serial2.println(textmessage);
      delay(1000);
      digitalWrite(buzzer,LOW);  
      delay(1000);
   }
}
void getgps(TinyGPS &gps)
{

  
  //decode and display position data
  
  gps.f_get_position(&latitude, &longitude);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Lat:");
  lcd.print(latitude,5);
  lcd.print(" ");
  Serial.print("Lat:");
  Serial.println(latitude,5);
  
  lcd.setCursor(0,1);
  lcd.print("Long:");
  lcd.print(longitude,5);
  Serial.print("Long:");
  Serial.println(longitude,5);
  
  String one = "Vehicle Location AT:https://www.google.com/maps/?q=";
  String two = "," ;   
  String message = one +latitude +two + longitude;
  
  // Convert String to char array
  int str_len = message.length() + 1;
  char textmessage[str_len];
  message.toCharArray(textmessage,str_len);
  Serial.println(textmessage);
  delay(1000);  
  HEART_BEAT_MONITOR();
  Temp_Read();
  GAS_check();
  sound_check();
  ACCELEROMETER();

  if(digitalRead(SW)==LOW)
  {
    lcd.clear();
    lcd.print("Switch Pressed");
      String one = "$Switch Pressed Vehicle Location AT:https://www.google.com/maps/?q=";
  String two = "," ;   
  String message = one +latitude +two + longitude+'#';
  
  // Convert String to char array
  int str_len = message.length() + 1;
  char textmessage[str_len];
  message.toCharArray(textmessage,str_len);
  Serial.println(textmessage);
  Serial2.println(textmessage);
  delay(1000);
  }
}
void HEART_BEAT_MONITOR()
{

   count=0;
   lcd.setCursor(0, 0);
   lcd.print("Place The Finger");
   lcd.setCursor(0, 1);
   lcd.print("to check HB");
   Serial.println("Place The Finger to check HB");
   delay(1000);
 // while(digitalRead(start)>0);
   lcd.clear();
   temp=millis();
   
   while(millis()<(temp+5000))
   {
   
      if(analogRead(data)<100)
        {
         count=count+1;
         
         lcd.setCursor(6, 0);
         lcd.write(byte(1));
         lcd.setCursor(7, 0);
         lcd.write(byte(2));
         lcd.setCursor(8, 0);
         lcd.write(byte(3));
         lcd.setCursor(9, 0);
         lcd.write(byte(4));

         lcd.setCursor(6, 1);
         lcd.write(byte(5));
         lcd.setCursor(7, 1);
         lcd.write(byte(6));
         lcd.setCursor(8, 1);
         lcd.write(byte(7));
         lcd.setCursor(9, 1);
         lcd.write(byte(8));
         
         while(analogRead(data)<100);

         lcd.clear();
        }
   }
   
         lcd.clear();
         lcd.setCursor(0, 0);
         count=count*2;
         lcd.setCursor(2, 0);
         lcd.write(byte(1));
         lcd.setCursor(3, 0);
         lcd.write(byte(2));
         lcd.setCursor(4, 0);
         lcd.write(byte(3));
         lcd.setCursor(5, 0);
         lcd.write(byte(4));

         lcd.setCursor(2, 1);
         lcd.write(byte(5));
         lcd.setCursor(3, 1);
         lcd.write(byte(6));
         lcd.setCursor(4, 1);
         lcd.write(byte(7));
         lcd.setCursor(5, 1);
         lcd.write(byte(8));
         lcd.setCursor(7, 1);
         lcd.print(count);
         lcd.print(" BPM");
         Serial.print("HB:");
         Serial.print(count);
         Serial.println("");
         if(count>120)
         {
            digitalWrite(buzzer, HIGH);
            delay(1000);
            digitalWrite(buzzer, LOW);
            delay(1000);
         }
         delay(1000);
}


void Temp_Read()
{
    DHT.read11(dht_dpin);
    Serial.print("Temperature:");
    Serial.print(DHT.temperature);   // Printing temperature on LCD
    Serial.print(" C");
    Serial.println("  ");
    lcd.clear();   
    lcd.setCursor(0,0);
    lcd.print("Temp:");
    lcd.print(DHT.temperature);   
    delay(1000);
}

void GAS_check()
{
  int smoke=analogRead(39);
  Serial.print("GAS VAL:");
  Serial.println(smoke);
  delay(1000);
  if(smoke>100) 
  {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("GAS DETECTED:");
      delay(1000);
      digitalWrite(buzzer, HIGH);
      delay(1000);   
    }
}

void sound_check()
{
    int sound_val=analogRead(34);
    Serial.print("SOUND VAL");
    Serial.println(sound_val);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("SOUND VAL:");
    lcd.print(sound_val);
    delay(1000);

  if(sound_val>150) 
  {
      Serial.print("Ambulance Detected");
      
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Ambulance Detected");
      delay(1000);
     
      digitalWrite(GREEN,HIGH);
      delay(1000);
      digitalWrite(GREEN,LOW);
      digitalWrite(RED,LOW);
      delay(1000);
  }
  else
  {
      digitalWrite(RED,HIGH);
      delay(1000);
  }
}

void loop() 
{
 
 byte a;
  
  if ( Serial.available() > 0 ) // if there is data coming into the serial line
  
  {
  
    a = Serial.read(); // get the byte of data
    
    if(gps.encode(a)) // if there is valid GPS data...
    {
    
      getgps(gps); // grab the data and display it on the LCD
    
    }
  
  }
  
} 
