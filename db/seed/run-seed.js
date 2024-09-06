const seed = require('./seed');
const data = require('../data/index')
const db = require('../connection');

const runSeed = () => {
    return seed(data).then(() => db.end());
};

runSeed();