const onoff = require('onoff');
const { Gpio } = onoff;

const ledPins = [17, 18, 19];
let leds = ledPins.map(pin => new Gpio(pin, 'out'));
let fluxInterval; // Declare the fluxInterval variable

const startLightFluxing = (speed = 200) => {
  try {
    let index = 0; // Track the index of the current LED

    fluxInterval = setInterval(() => {
      // Turn off all LEDs
      leds.forEach((led, i) => {
        try {
          if (led.writeSync) {
            led.writeSync(0);
          } else {
            console.error('LED writeSync is not available.');
          }
        } catch (writeError) {
          console.error('Error writing to LED:', writeError);
        }
      });

      // Turn on the current LED
      if (index < leds.length) {
        try {
          if (leds[index].writeSync) {
            leds[index].writeSync(1);
          } else {
            console.error('LED writeSync is not available.');
          }
        } catch (writeError) {
          console.error('Error writing to LED:', writeError);
        }
      }

      index++;

      // If all LEDs are turned on, reset the index
      if (index === leds.length) {
        index = 0;
      }
    }, speed);

    console.log(`Light fluxing started at speed ${speed}ms.`);
  } catch (startError) {
    console.error('Error in startLightFluxing:', startError);
  }
};

const setFluxSpeed = (speed) => {
  clearInterval(fluxInterval);
  fluxInterval = null;
  startLightFluxing(speed);
};

const stopLightFluxing = () => {
  clearInterval(fluxInterval);
  fluxInterval = null;

  leds.forEach(led => {
    try {
      if (led.writeSync) {
        led.writeSync(0);
      }
    } catch (stopError) {
      console.error('Error stopping light fluxing:', stopError);
    }
  });
};

process.on('SIGINT', () => {
  stopLightFluxing(); // Stop light fluxing before exiting
  leds.forEach(led => led.unexport());
  process.exit();
});

module.exports = { 
  startLightFluxing,
  setFluxSpeed,
  stopLightFluxing
};
