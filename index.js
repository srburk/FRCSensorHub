// index.js

// express
const express = require(`express`);
const app = express();

// IMPORTS ===========================

// classes

const SerialPort = require(`serialport`);
// var Readline = require('@serialport/parser-readline');
const WebSocket = require(`ws`).Server;

// libs
const cacher = require(`./libs/cacher`);
const serial = require(`./libs/serial`);
const jsonHandler = require(`./libs/json-handler`);
const i2cCaller = require(`./libs/i2c-caller`);
const gpio = require('./libs/gpio');

// CONFIG ==============================

// configuration file
const config = require(`./config.json`);

// serial port config
const port = new SerialPort(config.serial_path, { baudRate: config.baud_rate });

// websocket config
const ws = new WebSocket({ port: config.websocket_port });

// gpio configuration
gpio.init();

// EVENTS ==============================

// websocket connection event handler
ws.on(`connection`, (socket, req) => {

  // status handler
  console.log(`Client Connected`);

  socket.on(`close`, () => {
    console.log(`Client disconnected`);
  });
});

// serial input read handler
port.on('readable', () => {
  switch (serial.read(port)) {
    case "gyroCal":
      // Call gyro calibrate method
      i2cCaller.gyroCalibrate();
      break;
    case "gyroReset":
      // Call gyro reset method
      i2cCaller.gyroReset();
      break;
    default:
  }
})

// PERIODIC ============================

setInterval(() => {
  // stand-in updating value for sensor representation
  const time = new Date().toTimeString();

  // stand-in sensor data to be cached
  const message = {
    sensor1: {
      sensor: `Light`,
      number: time,
      type: time,
      id: time,
      reading: 4,
    },
    sensor2: {
      sensor: `Laser`,
      number: time,
      type: time,
      id: time,
      reading: 6,
    },
    sensor3: {
      sensor: `Lane`,
      number: time,
      type: time,
      id: time,
      reading: 6.66,
    },
  };

  // check gpio digital snesors
  gpio.check();

  // write cache
  cacher.write(message);

  // uart code
  serial.send(port, jsonHandler.buildMessage(cacher.read()));

  // websocket broadcasting
  ws.clients.forEach((client) => {
    client.send(JSON.stringify(cacher.read()));
  });

  // i2c testing
  i2cCaller.gyroRead();
}, 1000);

// ROUTES ==============================

// route to client app on GET at root
app.use(`/`, express.static(`client`));
// START ===============================

// listen on port 3000
app.listen(process.env.PORT || config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
