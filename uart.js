var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyAMA0', { baudRate: 9600 });

setInterval(() => {
        port.write('Hello World');
        console.log('Seems to be working');
}, 5000);
