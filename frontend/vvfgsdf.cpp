#include <Wire.h>
#include <hd44780.h>
#include <hd44780ioClass/hd44780_I2Cexp.h>

hd44780_I2Cexp lcd;

#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

int sensor_pin = A0;
int ldr_pin = A1;
int output_value;
int ldr_value;
int relayPin = 6;
int ldr_threshold = 300;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(sensor_pin, INPUT);
  pinMode(ldr_pin, INPUT);
  pinMode(relayPin, OUTPUT);
  
  lcd.begin(16, 2);
  lcd.setBacklight(1);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("DHT Error!");
    delay(2000);
    return;
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperature);
  lcd.print((char)223);
  lcd.print("C");

  lcd.setCursor(0, 1);
  lcd.print("Humidity: ");
  lcd.print(humidity);
  lcd.print("%");

  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.print((char)223);
  Serial.print("C  ");
  Serial.print("Humidity: ");
  Serial.println(humidity);

  delay(2000);

  output_value = analogRead(sensor_pin);
  output_value = map(output_value, 550, 10, 0, 100);

  ldr_value = analogRead(ldr_pin);
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Moisture: ");
  lcd.print(output_value);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("Light: ");
  lcd.print(ldr_value);

  Serial.print("Moisture: ");
  Serial.print(output_value);
  Serial.print("%  ");
  Serial.print("Light: ");
  Serial.println(ldr_value);

  lcd.setCursor(0, 1);

  if (output_value < -50 && ldr_value > ldr_threshold) {
    digitalWrite(relayPin, LOW);
    lcd.print("Motor ON");
    Serial.println("Motor ON ");
  } else {
    digitalWrite(relayPin, HIGH);
    lcd.print("Motor OFF");
    Serial.println("Motor OFF");
  }

  delay(2500);
}
