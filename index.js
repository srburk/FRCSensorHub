var express = require('express');
var app = express();

// config
var config = require('/config.json');

// imports
var SerialPort = require('serialport');
var WebSocket = require('ws').Server;

// our libraries
var cacher = require('./libs/cacher');
var serial = require('./libs/serial');
var jsonHandler = require('./libs/json-handler');

// serial port config
var port = new SerialPort(config.serial_path, { baudRate: config.baud_rate });

// websocket config
ws = new WebSocket({
  port: config.websocket_port
});

// websocket connection event handler
ws.on('connection', (socket, req) => {

  // status handler
  console.log('Client Connected');

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

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

  // RS232 code
  serial.send( port, jsonHandler.buildMessage(cacher.read()));

  // websocket broadcasting
  ws.clients.forEach((client) => {
    client.send(JSON.stringify(cacher.read()));
  });

}, 1000);

// route to client app on GET at root
app.use('/', express.static('client'));

// listen on port 3000
app.listen(process.env.PORT || config.port, () => {
  console.log('Server listening on port ' + config.port);
});
