const db = require('../connection');

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
        .then(() => {
            const equipmentTableQuery = db.query(`
                CREATE TABLE equipment (
                    equipment_id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL
                );`);

            const muscleGroupTableQuery = db.query(`
                CREATE TABLE muscle_groups (
                    group_id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL
                );`);

            const exercisesTableQuery = db.query(`
                CREATE TABLE exercises (
                    exercise_id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    description TEXT,
                    equipment_id INT,
                    group_id INT,
                    exercise_category TEXT,
                    image_url TEXT,
                    video_url TEXT,
                    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id) ON DELETE CASCADE,
                    FOREIGN KEY (group_id) REFERENCES muscle_groups(group_id) ON DELETE CASCADE
                );`);

            return Promise.all([equipmentTableQuery, muscleGroupTableQuery, exercisesTableQuery]);
        })
        .then(() => {
            
        })
        .catch((err) => {
            console.log("Error whilst running seed: ", err);
        });
};

module.exports = seed;
