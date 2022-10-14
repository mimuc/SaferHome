#include <Wire.h>

#define DEBUG 0

// uint16_t - size: 2 bytes - 0 to 65.535
// PINs to read the different VOltage values of the IoT-Dashboard
const byte TILE_PIN = 15;
const byte ROW_PIN = 16;
const byte COL_PIN = 17;

// RGB LED
// Pin of the LED to display the current security and privacy status.
const byte LED_PIN = 2;

const byte DEVICE_ADDR = 0x03; // Number of the Sensor, has to be unique over all Sensors connected to the IoT-Dashboard.
const float RESOLUTION = 0.0049; // Microcontroller reads analoge values with 1024 steps.  (5.12V/1024steps)

byte ledStatus = 0;


void setup() {
  Serial.begin(9600);
  Wire.begin(DEVICE_ADDR);
  Wire.onRequest(readSensorData);
  Wire.onReceive(setLedStatus);

  pinMode(LED_PIN, OUTPUT);
}

void loop() {

  ledController(ledStatus);

  #if DEBUG
  printValues();
  printConvert();
  #endif
}


void ledController(byte status) {
  Serial.print("Status: ");
  Serial.println(status);
  
  if (status == 2 || status == 1) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}

void setLedStatus(int numBytes) {
  while(Wire.available()) {	// read all bytes received
		ledStatus = Wire.read();
	}
}

void readSensorData() {
  // Reades the number and the tile, row and column voltage of the sensor.
  int tile = getTile();
  int row = getRow();
  int col = getCol();
  
  const byte len = 7; // (3 * 2 byte) + 1 byte (DEVICE_ADDR)
  byte sensor [len];

  // https://thewanderingengineer.com/2015/05/06/sending-16-bit-and-32-bit-numbers-with-arduino-i2c/
  
  sensor[0] = DEVICE_ADDR;
  sensor[1] = firstElement(tile);
  sensor[2] = secondElement(tile);
  sensor[3] = firstElement(row);
  sensor[4] = secondElement(row);
  sensor[5] = firstElement(col);
  sensor[6] = secondElement(col);
  
  Wire.write(sensor, len);
}

byte firstElement(int num) {
  return (num >> 8) & 0xFF;
}

byte secondElement(int num) {
  return num & 0xFF;
}

int getTile() {
  return analogRead(TILE_PIN);
}

int getRow() {
  return analogRead(ROW_PIN);
}

int getCol() {
  return analogRead(COL_PIN);
}






/*
 * TESTS
 */

void printValues() {
  Serial.print("Tile: ");
  Serial.print(getTile());
  Serial.print(" - ");
  Serial.println(getTile() * RESOLUTION);

  Serial.print("Row: ");
  Serial.print(getRow());
  Serial.print(" - ");
  Serial.println(getRow() * RESOLUTION);

  Serial.print("Col: ");
  Serial.print(getCol());
  Serial.print(" - ");
  Serial.println(getCol() * RESOLUTION);
}

void printConvert() {
  int bigNum = 1234;
  byte myArray[2];
 
  myArray[0] = (bigNum >> 8) & 0xFF;  // 4    - 00000100
  myArray[1] = bigNum & 0xFF;         // 210  - 11010010

  Serial.println(myArray[0]);
  Serial.println(myArray[1]);
  int num;
  byte a, b;
  
  a = myArray[0];
  b = myArray[1];
  num = a;
  num = (num << 8) | b;
  
  Serial.print("Converted Number: ");
  Serial.println(num);
};
