function send( serial, data ) {
  serial.write(data);
}

module.exports = {
  send
}
