// libs/json-handler.js

// EXPORT ==============================

// build JSON message from cache
exports.buildMessage = (json) => {
  var message = '';
  for (var obj in json) {
    message += json[obj].reading + ',';
  }
  return message
}
