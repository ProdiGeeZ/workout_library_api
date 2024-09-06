const db = require('./connection');

const seed = () => {
    return db
        .query(`DROP TABLE IF EXISTS comments;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS exercises;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS muscle_groups;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS equipment;`);
        })
};

module.exports = seed;