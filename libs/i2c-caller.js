// libs/i2c-caller

// IMPORT ============================

const i2cBus = require(`i2c-bus`);
const gyro = require(`./Sensors/gyro`);
const bus = i2cBus.openSync(1);

// EXPORT ==============================

// let gyroCalibrate = () => {
//   gyro.calibrate(bus);
// };
//
// let gyroReset = () => {
//   gyro.reset(bus);
// };
//
// let gyroRead = () => {
//   let reading = gyro.read(bus)
//   console.log(reading);
//   return reading
// };

let buildJSON = () => {

  // stand-in updating value for sensor representation
  const time = new Date().toTimeString();
  // let gyroValue = gyroRead()
  let gyroValue = time;

  // stand-in sensor data to be cached
  let message = {
    sensor1: {
      sensor: `Gyro`,
      number: gyroValue,
      type: gyroValue,
      id: gyroValue,
      reading: gyroValue,
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

module.exports = {
  gyroCalibrate,
  gyroReset,
  gyroRead,
  buildJSON
}
