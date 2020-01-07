var express = require('express');
var WebSocket = require('ws').Server;
var cacher = require('./cache-manager');

var app = express();

// initialize Websocket server
ws = new WebSocket({
  port: 8080
});


// websocket connection event handler
ws.on('connection', (socket, req) => {
  // client information
  const ip = req.connection.remoteAddress;

  // status handler
  console.log('Client connected:' + ip);

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

setInterval(() => {
  var time = new Date().toTimeString();
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

  // fs.writeFile('cache.json', JSON.stringify( message ), 'utf8', (err) => {
  //   if (err) throw err;

    cacher.write(message);
    ws.clients.forEach((client) => {
      client.send(cacher.read());
    });
}, 1000);


// websocket broadcaster
// setInterval(() => {
//   ws.clients.forEach((client) => {
//     // client.send(new Date().toTimeString());
//     // make msg object with information for packet
//     var time = new Date().toTimeString();
//     // Stand - in
//     client.send(JSON.stringify(message));
//   });
// }, 1000);

// route to client app on GET at root
app.use('/', express.static('client'));

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('FRCSensorHub listening on port 3000');
});
