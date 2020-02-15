// libs/cacher.js

// CONFIG ==============================

const fs = require(`fs`);
const path = require(`path`);

// EXPORT ==============================

// write to cache
exports.write = (data) => {
  try {
    fs.writeFileSync(path.join(__dirname, `../cache.json`), JSON.stringify(data));

  } catch(err) {
    console.log("Error: " + err);
  }
};

// read cache: return as JSON Object
exports.read = () => {
  try {
    let obj = JSON.parse(fs.readFileSync(path.join(__dirname, `../cache.json`), `utf8`));
  } catch(err) {
    console.log("Error: " + err);
  }
  return obj;
};
