#include <WiFi.h>
#include <PubSubClient.h>

const int trig_pin = 5;
const int echo_pin = 18;

#define SOUND_SPEED 340  
#define TRIG_PULSE_DURATION_US 10

long ultrason_duration;
float distance_cm;

const char* ssid = "iPhone 14 pro max de Lucas";
const char* password = "8cz3f5lc";

const char* mqtt_broker = "maqiatto.com";
const char* topic = "lucas.chalscl@gmail.com/LeWell";
const char* mqtt_username = "lucas.chalscl@gmail.com";
const char* mqtt_password = "caac";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
      Serial.print((char) payload[i]);
  }
  Serial.println();
  Serial.println("-----------------------");
}

void setup() {
  Serial.begin(115200);

  pinMode(trig_pin, OUTPUT);
  pinMode(echo_pin, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  client.setServer(mqtt_broker, mqtt_port);
  while (!client.connected()) {
      String client_id = "esp32-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("Public emqx mqtt broker connected");
      } else {
          Serial.print("failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  client.setCallback(callback);
}

void measureDistance() {
  // Prepare le signal
  digitalWrite(trig_pin, LOW);
  delayMicroseconds(2);
  // Créer une impulsion de 10 µs
  digitalWrite(trig_pin, HIGH);
  delayMicroseconds(TRIG_PULSE_DURATION_US);
  digitalWrite(trig_pin, LOW);

  // Renvoie le temps de propagation de l'onde (en µs)
  ultrason_duration = pulseIn(echo_pin, HIGH);

  // Calcul de la distance
  distance_cm = ultrason_duration * SOUND_SPEED / 2 * 0.0001;

  // On affiche la distance sur le port série
  Serial.print("Distance (cm): ");
  Serial.println(distance_cm);
}
void loop() {
  // Measure distance
  measureDistance();

  // Publish distance to MQTT broker
  char distance_str[10]; // Allocate space for the string
  dtostrf(distance_cm, 5, 2, distance_str); // Convert float to string
  client.publish(topic, distance_str);
  client.loop();

  delay(2000);
}