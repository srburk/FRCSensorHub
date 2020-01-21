// libs/gpio.js

// CONFIG ==============================

var gpio = require('rpio');

// EXPORT ==============================

// intitializer for gpio pins
exports.init = () => {
  gpio.init({ mapping: 'gpio' });

  // Configure specific pins here
  gpio.open(13, gpio.INPUT);
}

// check gpio pin readouts
exports.check = () => {
  // Configure specific pins to read here
  gpio.read(13);
}
