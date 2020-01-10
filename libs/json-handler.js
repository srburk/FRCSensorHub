function buildMessage( json ) {
  var message = '';
  for (var obj in json) {
      message += json[obj].reading + ',';
  }
  return message
}

module.exports = {
  buildMessage
}
