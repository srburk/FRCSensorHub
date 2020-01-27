// libs/cacher.js

// CONFIG ==============================

const fs = require(`fs`);
const path = require(`path`);

// EXPORT ==============================

// write to cache
exports.write = (data) => {
  fs.writeFileSync(path.join(__dirname, `../cache.json`), JSON.stringify(data));
};

// read cache: return as JSON Object
exports.read = () => {
  const obj = JSON.parse(fs.readFileSync(path.join(__dirname, `../cache.json`), `utf8`));
  return obj;
};
