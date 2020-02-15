// i2c address is 0x20

const register = require(`../Sensors/gyroRegisters.json`);
const gyroAddress = 0x10;
const calibrateBuffer = Buffer.from([0x03, 0x4E]);
const resetBuffer = Buffer.from([0x03, 0x52]);
const normalOperationBuffer = Buffer.from([0x03, 0x00]);
const read_msb = 0x05;
const read_lsb = 0x04;

exports.read = (bus) => { // Cartesian heading(0-359, unsigned, resets to 0 after 359)
  let angle;
  let lsb = bus.readByteSync(gyroAddress, read_lsb);
  let msb = bus.readByteSync(gyroAddress, read_msb);
  msb <<= 8;
  angle = msb + lsb;
  return angle;
};

// exports.read = (bus) => {          //Absolute heading(positive or neagtive, signed, does not have a limit)
//let angle;
// let lsb = bus.readByteSync(gyroAddress, read_lsb);
// let msb = bus.readByteSync(gyroAddress, read_msb);
// msb <<= 8;
// angle = msb + lsb;
// return angle;
// }

exports.calibrate = (bus) => {
  bus.i2cWriteSync(gyroAddress, 2, calibrateBuffer);
  bus.i2cWriteSync(gyroAddress, 2, normalOperationBuffer);
};

exports.reset = (bus) => {
  bus.i2cWriteSync(gyroAddress, 2, resetBuffer);
  bus.i2cWriteSync(gyroAddress, 2, normalOperationBuffer);
};

exports.write = () => {
  // Hi Mom!
};
