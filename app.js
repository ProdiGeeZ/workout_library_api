const express = require('express');
const { helloWorld, getAllExercises, getExerciseById } = require('./controllers/exercises.controller');
const { getAllEquipment } = require('./controllers/equipment.controller');
const { getAllMuscleGroups } = require('./controllers/muscleGroups.controller');
const app = express();
app.use(express.json());

app.get('/', helloWorld);

app.get('/api/exercises', getAllExercises);
app.get('/api/exercises/:exercise_id', getExerciseById);

app.get('/api/equipment', getAllEquipment);

app.get('/api/muscle-groups', getAllMuscleGroups);
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.msg || "Internal Server Error";
    if (err.code === '22P02') {
        return res.status(400).send({ msg: "Bad Request: Invalid request format." });
    }
    res.status(status).send({ msg: message });
});

module.exports = app;