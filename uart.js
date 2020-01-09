var raspi = require('raspi');
var Serial = require('raspi-serial').Serial;

raspi.init(() => {
        var serial = new Serial();
        serial.open(() => {
                serial.on('data', (data) => {
                        process.stdout.write(data);
                });
                console.log('Seems to be working');
                serial.write('Hello from Raspberry Pi');
        });
});
