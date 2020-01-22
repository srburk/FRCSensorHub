var bus = require('i2c-bus');
var gyro = require('./Sensors/gyro');
var gyroAdd = 0x20;
var converterAdd = 0x72;

exports.setup = () => {
    bus.openSync(0);
    gyro.calibrate(bus);
    gyro.reset(bus);
}
exports.gyroRead = () => {
    console.log(gyro.read(bus));
}