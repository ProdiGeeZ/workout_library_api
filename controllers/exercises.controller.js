const { 
    fetchAllExercises, 
    fetchExerciseById, 
    fetchExercisesByEquipmentId, 
    fetchExercisesByMuscleGroupId, 
    addExercise, 
    deleteExerciseById, 
    editExerciseById 
} = require("../models/exercises.model");

const documentation = require('../endpoints.json');
const logger = require('../utils/logger'); 

exports.getDocs = (req, res) => {
    logger.info('Documentation endpoint accessed.');
    res.status(200).send({ documentation });
};

exports.getAllExercises = (req, res, next) => {
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    logger.info(`Fetching exercises with limit=${limit}, page=${page}, sort_by=${sort_by}, order=${order}`);
    
    return fetchAllExercises(limit, page, sort_by, order)
        .then((exercises) => {
            logger.info(`Successfully fetched ${exercises.length} exercises.`);
            res.status(200).send({ exercises });
        })
        .catch((err) => {
            logger.error(`Error fetching exercises: ${err.message}`);
            next(err);
        });
};

exports.getExerciseById = (req, res, next) => {
    const { exercise_id } = req.params;
    logger.info(`Fetching exercise with ID=${exercise_id}`);
    
    return fetchExerciseById(exercise_id)
        .then((exercise) => {
            logger.info(`Successfully fetched exercise: ${exercise.name}`);
            res.status(200).send({ exercise });
        })
        .catch((err) => {
            logger.error(`Error fetching exercise with ID=${exercise_id}: ${err.message}`);
            next(err);
        });
};

exports.getExercisesByEquipmentId = (req, res, next) => {
    const { equipment_id } = req.params;
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    logger.info(`Fetching exercises by equipment ID=${equipment_id} with limit=${limit}, page=${page}, sort_by=${sort_by}, order=${order}`);
    
    return fetchExercisesByEquipmentId(equipment_id, limit, page, sort_by, order)
        .then((exercises) => {
            logger.info(`Successfully fetched ${exercises.length} exercises for equipment ID=${equipment_id}.`);
            res.status(200).send({ exercises });
        })
        .catch((err) => {
            logger.error(`Error fetching exercises for equipment ID=${equipment_id}: ${err.message}`);
            next(err);
        });
};

exports.getExercisesByMuscleGroupId = (req, res, next) => {
    const { group_id } = req.params;
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    logger.info(`Fetching exercises by muscle group ID=${group_id} with limit=${limit}, page=${page}, sort_by=${sort_by}, order=${order}`);
    
    return fetchExercisesByMuscleGroupId(group_id, limit, page, sort_by, order)
        .then((exercises) => {
            logger.info(`Successfully fetched ${exercises.length} exercises for muscle group ID=${group_id}.`);
            res.status(200).send({ exercises });
        })
        .catch((err) => {
            logger.error(`Error fetching exercises for muscle group ID=${group_id}: ${err.message}`);
            next(err);
        });
};

exports.postExercise = (req, res, next) => {
    const exerciseData = req.body;
    logger.info('Adding a new exercise:', exerciseData);
    
    addExercise(exerciseData)
        .then((exercise) => {
            logger.info(`Successfully added new exercise: ${exercise.name}`);
            res.status(201).send({ exercise, msg: "Exercise added." });
        })
        .catch((err) => {
            logger.error(`Error adding new exercise: ${err.message}`);
            next(err);
        });
};

exports.deleteExercise = (req, res, next) => {
    const { exercise_id } = req.params;
    logger.info(`Deleting exercise with ID=${exercise_id}`);
    
    deleteExerciseById(exercise_id)
        .then(() => {
            logger.info(`Successfully deleted exercise with ID=${exercise_id}`);
            res.status(204).send({ msg: "Exercise deleted." });
        })
        .catch((err) => {
            logger.error(`Error deleting exercise with ID=${exercise_id}: ${err.message}`);
            next(err);
        });
};

exports.editExercise = (req, res, next) => {
    const { exercise_id } = req.params;
    const exerciseData = req.body;
    logger.info(`Updating exercise with ID=${exercise_id}`, exerciseData);
    
    editExerciseById(exercise_id, exerciseData)
        .then((exercise) => {
            logger.info(`Successfully updated exercise with ID=${exercise_id}: ${exercise.name}`);
            res.status(200).send({ exercise, msg: "Exercise updated." });
        })
        .catch((err) => {
            logger.error(`Error updating exercise with ID=${exercise_id}: ${err.message}`);
            next(err);
        });
};