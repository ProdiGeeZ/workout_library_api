const db = require('../db/connection')

exports.fetchExercises = () => {
    return db.query(`SELECT * FROM exercises;`)
    .then((result) => {
        return result.rows;
    });
};