// libs/json-handler.js

// EXPORT ==============================

// build JSON message from cache
exports.buildMessage = (json) => {
  let message = ``;
  for (const obj in json) {
    message += `${json[obj].reading},`;
  }
  return message;
};
