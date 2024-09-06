const db = require('../db/connection');

exports.fetchAllMuscleGroups = () => {
    return db.query(`SELECT * FROM muscle_groups;`)
        .then((result) => {
            return result.rows;
        });
};