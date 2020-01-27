const i2cBus = require(`i2c-bus`);
const gyro = require(`./Sensors/gyro`);
const bus = i2cBus.openSync(1);

exports.gyroCalibrate = () => {
  gyro.calibrate(bus);
};
exports.gyroReset = () => {
  gyro.reset(bus);
}
exports.gyroRead = () => {
  console.log(gyro.read(bus));
};
