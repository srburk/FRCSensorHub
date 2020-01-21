exports.setup = () => {
    var bus = require('i2c-bus');
    var gyroAdd = 0x20;
    var converterAdd = 0x72;
    bus.openSync(0);
    gyro.calibrate(bus);
    gyro.reset(bus);
}
exports.gyroRead = () => {
    console.log(gyro.read(bus));
}