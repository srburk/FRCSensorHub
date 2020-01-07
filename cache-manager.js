var fs = require('fs');

function startup() {
  fs.writeFile('cache.json', '', 'utf8', (err) => {
    if (err) throw err;
  });
}
function write( data ) {
  fs.writeFile('cache.json', JSON.stringify( data, null, 2 ), 'utf8', (err) => {
    if (err) throw err;
  });
}

function read() {
  fs.readFile('cache.json', 'utf8', (err, data) => {
    if (err) throw err;

    console.log(data);
  });
}

module.exports = {
  startup,
  write,
  read
}
