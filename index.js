var express = require('express');
var WebSocket = require('ws').Server;

var app = express();

// config
const serialPath = '/dev/ttyAMA0'
const baud = 9600;
const socketPort = 8080;

// our libraries
var cacher = require('./libs/cacher');
var uart = require('./libs/rs232');

// serial port setup
var SerialPort = require('serialport');
var port = new SerialPort(serialPath, { baudRate: baud });

// initialize Websocket server
ws = new WebSocket({
  port: socketPort
});

cacher.init();

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
      type: 5,
      id: time,
      reading: time
    },
    sensor2: {
      sensor: 'Laser',
      number: time,
      type: time,
      id: 0,
      reading: time
    },
    sensor3: {
      sensor: 'Lane',
      number: time,
      type: time,
      id: time,
      reading: time
    }
  }

  // RS232 code
  uart.send( port, 'Drew Friend is a nasty fellow');

  // write cache
  cacher.write(message);

  // websocket broadcasting
  ws.clients.forEach((client) => {
    client.send(JSON.stringify(cacher.read()));
  });
}, 1000);

// route to client app on GET at root
app.use('/', express.static('client'));

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('FRCSensorHub listening on port 3000');
});
