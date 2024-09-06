const db = require('../connection');
const format = require('pg-format');

const seed = ({ muscleGroupsData, equipmentData, exercisesData }) => {
    return db.query("BEGIN")
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
            return db.query(`
                CREATE TABLE IF NOT EXISTS equipment (
                    equipment_id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL
                );
            `);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE IF NOT EXISTS muscle_groups (
                    group_id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL
                );
            `);
        })
        .then(() => {
            return db.query(`
                CREATE TABLE IF NOT EXISTS exercises (
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
                );
            `);
        })
        .then(() => {
            const insertEquipmentQuery = format(
                `INSERT INTO equipment (name) VALUES %L ON CONFLICT DO NOTHING;`,
                equipmentData.map(({ name }) => [name])
            );
            return db.query(insertEquipmentQuery);
        })
        .then(() => {
            const insertMuscleGroupsQuery = format(
                `INSERT INTO muscle_groups (name) VALUES %L ON CONFLICT DO NOTHING RETURNING *;`,
                muscleGroupsData.map(({ name }) => [name])
            );
            return db.query(insertMuscleGroupsQuery);
        })
        .then(() => {
            const insertExercisesQuery = format(
                `INSERT INTO exercises (name, description, equipment_id, group_id, exercise_category, image_url, video_url) VALUES %L ON CONFLICT DO NOTHING RETURNING *;`,
                exercisesData.map(
                    ({
                        name,
                        description,
                        equipment_id,
                        group_id,
                        exercise_category,
                        image_url,
                        video_url,
                    }) => [
                        name,
                        description,
                        equipment_id,
                        group_id,
                        exercise_category,
                        image_url,
                        video_url,
                    ]
                )
            );
            return db.query(insertExercisesQuery);
        })
        .then(() => {
            return db.query("COMMIT"); 
        })
        .catch((err) => {
            console.log('Error whilst running seed: ', err);
            return db.query("ROLLBACK"); 
        });
};

module.exports = seed;
