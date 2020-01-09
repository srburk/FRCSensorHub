var SerialPort = require('serialport');
var port = new SerialPort(path, { baudRate: 256000 });

setInterval(() => {
  port.write('F*** apple');
}, 1000);
