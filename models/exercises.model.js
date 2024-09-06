const db = require('../db/connection')

exports.fetchAllExercises = () => {
    return db.query(`SELECT * FROM exercises;`)
        .then((result) => {
            return result.rows;
        });
};

exports.fetchExerciseById = (exercise_id) => {
    return db.query(`SELECT * FROM exercises WHERE exercise_id = $1;`, [exercise_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found: Exercise does not exist.' });
            }
            return result.rows[0];
        });
}