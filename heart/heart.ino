/*  PulseSensor™ Starter Project   http://www.pulsesensor.com

  This an Arduino project. It's Best Way to Get Started with your PulseSensor™ & Arduino.
  -------------------------------------------------------------
  1) This shows a live human Heartbeat Pulse.
  2) Live visualization in Arduino's Cool "Serial Plotter".
  3) Blink an LED on each Heartbeat.
  4) This is the direct Pulse Sensor's Signal.
  5) A great first-step in troubleshooting your circuit and connections.
  6) "Human-readable" code that is newbie friendly."

*/




//  Variables
int Residuo[4] = {0, 0, 0, 0};
int Sensor1 = A1;
int PulseSensorPurplePin = 0;        // Pulse Sensor PURPLE WIRE connected to ANALOG PIN 0
int LED13 = 11;   //  The on-board Arduion LED


int Signal;                // holds the incoming raw data. Signal value can range from 0-1024
int Threshold = 550;            // Determine which Signal to "count as a beat", and which to ingore.


// The SetUp Function:
void setup() {
  pinMode(4, INPUT); // Setup for leads off detection LO +
  pinMode(5, INPUT); // Setup for leads off detection LO -

  pinMode(Sensor1, INPUT);
  pinMode(LED13, OUTPUT);        // pin that will blink to your heartbeat!
  Serial.begin(9600);         // Set's up Serial Communication at certain speed.

}

// The Main Loop Function
void loop()
{
  if ((digitalRead(4) == 1) || (digitalRead(5) == 1)) {
    Signal = 250;
  }
  else {
    // send the value of analog input 0:

    Signal = analogRead(PulseSensorPurplePin);
  }

  // Read the PulseSensor's value.
  // Assign this value to the "Signal" variable.

 // Serial.println(Signal);

  for (int i = 0; i <= 3; i++) {
    Residuo[i] = Signal % 10;
    Signal = (Signal - Signal % 10) / 10;
  }

  Serial.write('a');
  for (int i = 3; i >= 0; i--) {
    Serial.write(Residuo[i]);
  }
  Serial.write('c');




  delay(5);


}





