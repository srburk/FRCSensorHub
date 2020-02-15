// libs/serial.js

// EXPORT ==============================

// write to serial port
exports.send = (serial, data) => {
  serial.write(data, (err) => {
    if (err) {
      return console.log(`Error on write: `, err.message);
    }
  });
  console.log(`Sending Data`);
};

// read from serial port
exports.read = (serial) => {
  const data = serial.read();
  return String(data);
};
