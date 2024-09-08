const db = require('../db/connection')
const format = require('pg-format');

exports.fetchAllExercises = (limit = 10, page = 1, sort_by = 'name', order = 'asc') => {
    const validSortByFields = ['name', 'exercise_category', 'equipment_id', 'group_id'];
    const validOrder = ['asc', 'desc'];

    if (!validSortByFields.includes(sort_by)) sort_by = 'name'; 
    if (!validOrder.includes(order)) order = 'asc'; 

    const offset = (page - 1) * limit;

    return db.query(
        `SELECT * FROM exercises
        ORDER BY ${sort_by} ${order.toUpperCase()}
        LIMIT $1 OFFSET $2;`,
        [limit, offset]
    ).then((result) => {
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

exports.fetchExercisesByEquipmentId = (equipment_id, limit = 10, page = 1, sort_by = 'name', order = 'asc') => {
    const validSortByFields = ['name', 'exercise_category', 'group_id'];
    const validOrder = ['asc', 'desc'];

    if (!validSortByFields.includes(sort_by)) sort_by = 'name';
    if (!validOrder.includes(order)) order = 'asc';

    const offset = (page - 1) * limit;

    return db.query(
        `SELECT * FROM exercises
        WHERE equipment_id = $1
        ORDER BY ${sort_by} ${order.toUpperCase()}
        LIMIT $2 OFFSET $3;`,
        [equipment_id, limit, offset]
    ).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found: Equipment does not exist.' });
        }
        return result.rows;
    });
};

exports.fetchExercisesByMuscleGroupId = (group_id, limit = 10, page = 1, sort_by = 'name', order = 'asc') => {
    const validSortByFields = ['name', 'exercise_category', 'equipment_id'];
    const validOrder = ['asc', 'desc'];

    if (!validSortByFields.includes(sort_by)) sort_by = 'name';
    if (!validOrder.includes(order)) order = 'asc';

    const offset = (page - 1) * limit;

    return db.query(
        `SELECT * FROM exercises
        WHERE group_id = $1
        ORDER BY ${sort_by} ${order.toUpperCase()}
        LIMIT $2 OFFSET $3;`,
        [group_id, limit, offset]
    ).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found: Muscle group does not exist.' });
        }
        return result.rows;
    });
};

exports.addExercise = (exerciseData) => {
    const values = [
        exerciseData.name,
        exerciseData.description,
        exerciseData.equipment_id,
        exerciseData.group_id,
        exerciseData.exercise_category,
        exerciseData.image_url,
        exerciseData.video_url
    ];

    const query = format(`
        INSERT INTO exercises (name, description, equipment_id, group_id, exercise_category, image_url, video_url)
        VALUES %L
        RETURNING *;
    `, [values]);

    return db.query(query)
        .then((result) => {
            return result.rows[0];
        });
}

exports.deleteExerciseById = (exercise_id) => {
    return db.query(`DELETE FROM exercises WHERE exercise_id = $1;`, [exercise_id])
        .then((result) => {
            if (result.rowCount === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found: Exercise does not exist.' });
            }
            return result.rows[0];
        });
}

exports.editExerciseById = (exercise_id, exerciseData) => {
    const fields = [];
    const values = [];

    if (exerciseData.name) {
        fields.push('name = %L');
        values.push(exerciseData.name);
    }
    if (exerciseData.description) {
        fields.push('description = %L');
        values.push(exerciseData.description);
    }
    if (exerciseData.equipment_id) {
        fields.push('equipment_id = %L');
        values.push(exerciseData.equipment_id);
    }
    if (exerciseData.group_id) {
        fields.push('group_id = %L');
        values.push(exerciseData.group_id);
    }
    if (exerciseData.exercise_category) {
        fields.push('exercise_category = %L');
        values.push(exerciseData.exercise_category);
    }
    if (exerciseData.image_url) {
        fields.push('image_url = %L');
        values.push(exerciseData.image_url);
    }
    if (exerciseData.video_url) {
        fields.push('video_url = %L');
        values.push(exerciseData.video_url);
    }

    if (fields.length === 0) {
        return Promise.reject({ status: 400, msg: 'No fields to update' });
    }

    values.push(exercise_id);

    const query = format(`
        UPDATE exercises
        SET ${fields.join(', ')}
        WHERE exercise_id = %L
        RETURNING *;
    `, ...values);

    return db.query(query)
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found: Exercise does not exist.' });
            }
            return result.rows[0];
        });
};
