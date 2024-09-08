const express = require('express');
const { 
    getAllExercises, 
    getExerciseById, 
    getExercisesByEquipmentId, 
    getExercisesByMuscleGroupId, 
    postExercise, 
    deleteExercise, 
    editExercise 
} = require('../controllers/exercises.controller');

const router = express.Router();

router.route('/')
    .get(getAllExercises)
    .post(postExercise);

router.route('/:exercise_id')
    .get(getExerciseById)
    .put(editExercise)
    .delete(deleteExercise);

router.get('/equipment/:equipment_id', getExercisesByEquipmentId);
router.get('/muscle-group/:group_id', getExercisesByMuscleGroupId);

module.exports = router;