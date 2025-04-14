//const devData = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
  return seed()
  .then((rows) => db.end());
};

runSeed();
