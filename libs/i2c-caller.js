// libs/i2c-caller

// IMPORT ============================

const i2cBus = require(`i2c-bus`);
const gyro = require(`./Sensors/gyro`);
const bus = i2cBus.openSync(1);

// EXPORT ==============================

exports.gyroCalibrate = () => {
  gyro.calibrate(bus);
};
exports.gyroReset = () => {
  gyro.reset(bus);
}
exports.gyroRead = () => {
  console.log(gyro.read(bus));
};

exports.buildJSON = () => {

  // stand-in updating value for sensor representation
  const time = new Date().toTimeString();

  // stand-in sensor data to be cached
  let message = {
    sensor1: {
      sensor: `Gyro`,
      number: gyroRead(),
      type: gyroRead(),
      id: gyroRead(),
      reading: gyroRead(),
    },
    sensor2: {
      sensor: `Laser`,
      number: time,
      type: time,
      id: time,
      reading: 6,
    },
    sensor3: {
      sensor: `Lane`,
      number: time,
      type: time,
      id: time,
      reading: 6.66,
    },
  };
  return message
}
