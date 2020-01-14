// index.js

// express
var express = require('express');
var app = express();

// IMPORTS ===========================

// classes
var SerialPort = require('serialport');
// var Readline = require('@serialport/parser-readline');
var WebSocket = require('ws').Server;

// libs
var cacher = require('./libs/cacher');
var serial = require('./libs/serial');
var jsonHandler = require('./libs/json-handler');

// CONFIG ==============================

// configuration file
var config = require('./config.json');

// serial port config
var port = new SerialPort(config.serial_path, { baudRate: config.baud_rate });

// websocket config
ws = new WebSocket({ port: config.websocket_port });

// EVENTS ==============================

// websocket connection event handler
ws.on('connection', (socket, req) => {

  // status handler
  console.log('Client Connected');

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// serial input
port.on('readable', () => {
  console.log('Data: ', serial.read(port));
})

// PERIODIC ============================

setInterval(() => {
  // stand-in updating value for sensor representation
  var time = new Date().toTimeString();

  // stand-in sensor data to be cached
  var message = {
    sensor1: {
      sensor: 'Light',
      number: time,
      type: time,
      id: time,
      reading: 4
    },
    sensor2: {
      sensor: 'Laser',
      number: time,
      type: time,
      id: time,
      reading: 6
    },
    sensor3: {
      sensor: 'Lane',
      number: time,
      type: time,
      id: time,
      reading: 6.66
    }
  }

  // write cache
  cacher.write(message);

  // uart code
  serial.send( port, jsonHandler.buildMessage(cacher.read()));

  // websocket broadcasting
  ws.clients.forEach((client) => {
    client.send(JSON.stringify(cacher.read()));
  });

}, 1000);

// ROUTES ==============================

// route to client app on GET at root
app.use('/', express.static('client'));

// START ===============================

// listen on port 3000
app.listen(process.env.PORT || config.port, () => {
  console.log('Server listening on port ' + config.port);
});
