const i2cBus = require(`i2c-bus`);
const gyro = require(`./Sensors/gyro`);
const converterAdd = 0x72;
const bus = i2cBus.openSync();

exports.setup = () => {
  gyro.calibrate(bus);
  gyro.reset(bus);
};
exports.gyroRead = () => {
  console.log(gyro.read(bus));
};
