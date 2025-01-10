#include <WiFi.h>
#include <WebServer.h>
#include "DHT.h"
#define DHTPIN 4 
#define DHTTYPE DHT11
WebServer server(80);

// Replace with your network credentials
const char* ssid = "SriRam 4G";         // Your Wi-Fi SSID
const char* password = "hawktuah"; // Your Wi-Fi Password

// Onboard LED pin (usually GPIO2 on most ESP32 boards)
const int onboardLED = 2;
DHT dht(DHTPIN, DHTTYPE);
float h, t, f, hif, hic;

void handleRoot() {
  server.send(200, "text/plain", "ESP32 Web Server is running.");
}


void handleData() {
  String response = "{";
  response += "\"temperature\": " + String(t) + ",";  // Adding temperature as a number
  response += "\"humidity\": " + String(h) + ",";     // Adding humidity as a number
  response += "\"Heat Index\": " + String(hic);        // Adding heat index as a number
  response += "}";  // Close the JSON object
  
  // Add CORS headers (if necessary)
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", response); // Send the JSON response
}



void connectWifi() {
  // Start the serial communication
  Serial.begin(115200);
  delay(100);

  // Set the onboard LED pin as OUTPUT
  pinMode(onboardLED, OUTPUT);
  digitalWrite(onboardLED, LOW); // Turn off the LED initially

  // Start Wi-Fi connection
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(ssid, password);

  // Wait until the ESP32 is connected to the Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  // Once connected, print the local IP address
  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Turn on the onboard LED to indicate successful connection
  digitalWrite(onboardLED, HIGH);
}

void setup() {
  connectWifi();
  dht.begin();
  server.on("/", handleRoot);
  server.on("/data", handleData);

  // Start the server
  server.begin();
  Serial.println("Server started");
  
}

void loop() {
  delay(2000);
  h = dht.readHumidity();
  t = dht.readTemperature();
  f = dht.readTemperature(true);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  hif = dht.computeHeatIndex(f, h);
  hic = dht.computeHeatIndex(t, h, false);
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.print(F("°F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("°C "));
  Serial.print(hif);
  Serial.println(F("°F"));
  server.handleClient();
}
