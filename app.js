const express = require('express');
const { helloWorld, getAllExercises, getExerciseById, getExercisesByEquipmentId, getExercisesByMuscleGroupId, postExercise, deleteExercise, editExercise } = require('./controllers/exercises.controller');
const { getAllEquipment } = require('./controllers/equipment.controller');
const { getAllMuscleGroups } = require('./controllers/muscleGroups.controller');
const app = express();
app.use(express.json());

app.get('/', helloWorld);

app.get('/api/exercises', getAllExercises);
app.get('/api/exercises/:exercise_id', getExerciseById);
app.get('/api/exercises/equipment/:equipment_id', getExercisesByEquipmentId);
app.get('/api/exercises/muscle-group/:group_id', getExercisesByMuscleGroupId);
app.post('/api/exercises', postExercise);
app.delete('/api/exercises/:exercise_id', deleteExercise);
app.put('/api/exercises/:exercise_id', editExercise);

app.get('/api/equipment', getAllEquipment);

app.get('/api/muscle-groups', getAllMuscleGroups);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.msg || "Internal Server Error";
    if (err.code === '22P02') {
        return res.status(400).send({ msg: "Bad Request: Invalid request format." });
    }
    else if (err.code === '23502') {
        return res.status(400).send({ msg: `Bad Request: Request body is missing values.` });
    }
    else if (err.code === '23503') {
        return res.status(404).send({ msg: `Not Found: One or more values do not exist.` });
    }
    res.status(status).send({ msg: message });
});

module.exports = app;