var fs = require('fs');
var path = require('path');

exports.write = (data) => {
  fs.writeFileSync(path.join(__dirname, '../cache.json'), JSON.stringify(data));
}

exports.read = () => {
  var obj = JSON.parse(fs.readFileSync(path.join(__dirname, '../cache.json'), 'utf8'));
  return obj;
}
