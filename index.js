// index.js

// express
const express = require(`express`);
const app = express();

// IMPORTS ===========================

// classes

const SerialPort = require(`serialport`);
const WebSocket = require(`ws`).Server;

// libs
const cacher = require(`./libs/cacher`);
const serial = require(`./libs/serial`);
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

// FUNCTIONS ===========================

// build message for serial
let createMessage = (json) => {
  let serialMessage = ``;
  for (const obj in json) {
    serialMessage += `${json[obj].reading},`;
  }
  return serialMessage;
};

// PERIODIC ============================

setInterval(() => {

  // check gpio digital snesors
  gpio.check();

  // write cache
  cacher.write(i2cCaller.buildJSON());

  // uart code
  serial.send(port, createMessage(cacher.read()));

  // websocket broadcasting
  ws.clients.forEach((client) => {
    client.send(JSON.stringify(cacher.read()));
  });

}, 1000);

// ROUTES ==============================

// route to client app on GET at root
app.use(`/`, express.static(`client`));

// START ===============================

// listen on port 3000
app.listen(process.env.PORT || config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
