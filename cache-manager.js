var fs = require('fs');
var path = require('path');

// JSON.stringify( data, null, 2 )
function write( data ) {
  fs.writeFileSync(path.join(__dirname, 'cache.json'), JSON.stringify( data ));
}

function read() {
  var obj = JSON.parse(fs.readFileSync(path.join(__dirname, 'cache.json'), 'utf8'));
  return obj;
  // fs.readFile('cache.json', (err, data) => {
  //   console.log('Reading....');
  //   if (err) {
  //     console.log('Reading Error: ' + err);
  //   } else {
  //     try {
  //       // var json = JSON.parse(data);
  //       // console.log('Read successful: ' + data);
  //       return data;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // });
}

module.exports = {
  write,
  read
}
