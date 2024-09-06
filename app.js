const express = require('express');
const { helloWorld, getExercises } = require('./controllers/exercises.controller');
const app = express();

app.get('/', helloWorld);

app.get('/api/exercises', getExercises);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.msg || "Internal Server Error";
    res.status(status).send({ msg: message });
});

module.exports = app;