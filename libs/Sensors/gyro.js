// i2c address is 0x20

const register = require(`../Sensors/gyroRegisters.json`);
const gyroAddress = 0x10;
const calibrateBuffer = new Buffer(2);
calibrateBuffer[0] = 0x03;
calibrateBuffer[1] = 0x4E;

const resetBuffer = new Buffer(2);
resetBuffer[0] = 0x03;
resetBuffer[1] = 0x52;

const readBuffer_msb = new Buffer(2);
readBuffer_msb[0] = 0x05;
readBuffer_msb[1] = 0x00;

const readBuffer_lsb = new Buffer(2);
readBuffer_lsb[0] = 0x04;
readBuffer_lsb[1] = 0x00;
exports.read = (bus) => { // Cartesian heading(0-359, unsigned, resets to 0 after 359)
  let angle;
  let lsb = bus.readByteSync(gyroAddress, readBuffer_lsb);
  let msb = bus.readByteSync(gyroAddress, readBuffer_msb);
  msb <<= 8;
  angle = msb + lsb;
  return angle;
};

// exports.read = (bus) => {          //Absolute heading(positive or neagtive, signed, does not have a limit)
//
// }

exports.calibrate = (bus) => {
  bus.i2cWriteSync(gyroAddress, 2, calibrateBuffer);
};

exports.reset = (bus) => {
  bus.i2cWriteSync(gyroAddress, 2, resetBuffer);
};

exports.write = () => {
  // Hi Mom!
};
