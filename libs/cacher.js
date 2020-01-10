var fs = require('fs');
var path = require('path');

function write(data) {
  fs.writeFileSync(path.join(__dirname, '../cache.json'), JSON.stringify(data));
}

function read() {
  var obj = JSON.parse(fs.readFileSync(path.join(__dirname, '../cache.json'), 'utf8'));
  return obj;
}

module.exports = {
  read,
  write
}
