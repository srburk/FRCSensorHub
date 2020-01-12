// libs/serial.js

// EXPORT ==============================

// write to serial port
exports.send = ( serial, data ) => {
  serial.write(data);
  console.log('Sending Data');
}

// read from serial port
exports.read = () => {
  // read from serialport here
}
