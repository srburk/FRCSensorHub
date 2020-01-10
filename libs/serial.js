exports.send( serial, data ) {
  serial.write(data);
  console.log('Sending Data');
}
