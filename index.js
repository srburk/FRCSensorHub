var express = require('express');
var WebSocket = require('ws').Server;

var app = express();

// initialize Websocket server
ws = new WebSocket({ port: 8080 });

// websocket connection event handler
ws.on('connection', (socket, req) => {
  // client information
  const ip = req.connection.remoteAddress;

  // status handler
  socket.send('Connected to server via WebSocket');
  console.log('Client connected:' + ip);

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// websocket broadcaster
setInterval(() => {
  ws.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

// route to client app on GET at root
app.use('/', express.static('client'));

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('FRCSensorHub listening on port 3000');
});
