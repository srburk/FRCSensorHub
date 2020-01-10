function send( serial, data ) {
  serial.write(data);
  console.log('Sending Data');
}

module.exports = {
  send
}
