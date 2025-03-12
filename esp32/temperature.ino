#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

#define DHTPIN 4 
#define DHTTYPE DHT11

const char* ssid = "SriRam 4G";         // Your Wi-Fi SSID
const char* password = "hawktuah";      // Your Wi-Fi Password
const char* serverUrl = "http://192.168.1.21:8000/esp32/data"; // Replace with FastAPI backend URL

DHT dht(DHTPIN, DHTTYPE);
float h, t, hic;

void connectWifi() {
  Serial.begin(115200);
  delay(100);
  
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void sendDataToServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json"); // Specify JSON format

    // Read sensor data
    h = dht.readHumidity();
    t = dht.readTemperature();
    hic = dht.computeHeatIndex(t, h, false);
    
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Create JSON payload
    String payload = "{\"sensor_id\":\"esp32_01\", \"temperature\":" + String(t) +
                 ", \"humidity\":" + String(h) + "}";

    Serial.println("Sending data to server: " + payload);
    
    // Send HTTP POST request
    int httpResponseCode = http.POST(payload);

    // Get response from server
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Server Response: " + response);
    } else {
      Serial.print("Error sending data. HTTP Response code: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // Close connection
  } else {
    Serial.println("Wi-Fi not connected");
  }
}

void setup() {
  connectWifi();
  dht.begin();
}

void loop() {
  sendDataToServer();
  delay(5000); // Send data every 5 seconds
}
