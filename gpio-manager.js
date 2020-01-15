var gpio = require('rpio');

gpio.init({ mapping: 'gpio' });

gpio.open(13, gpio.OUTPUT);
gpio.open(19, gpio.INPUT, gpio.LOW);

var counter = 0

setInterval(() => {
  console.log(gpio.read(19));
  if (counter == 0) {
    gpio.write(13, gpio.HIGH);
  } else {
    gpio.write(13, gpio.LOW);
  }
}, 1000)
