const { fetchExercises } = require("../models/exercises.model");

exports.helloWorld = (req, res) => {
    res.status(200).send('Hello, World!');
};

exports.getExercises = (req, res, next) => {
    return fetchExercises()
    .then((exercises) => {
        res.status(200).send({exercises});
    })
    .catch(next);
};