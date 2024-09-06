const { fetchAllExercises, fetchExerciseById, fetchExercisesByEquipmentId,  } = require("../models/exercises.model");

exports.helloWorld = (req, res) => {
    res.status(200).send('Hello, World!');
};

exports.getAllExercises = (req, res, next) => {
    return fetchAllExercises()
    .then((exercises) => {
        res.status(200).send({exercises});
    })
    .catch(next);
};

exports.getExerciseById = (req, res, next) => {
    const { exercise_id } = req.params;
    return fetchExerciseById(exercise_id)
    .then((exercise) => {
        res.status(200).send({exercise});
    })
    .catch(next);
}

exports.getExercisesByEquipmentId = (req, res, next) => {
    const { equipment_id } = req.params;
    return fetchExercisesByEquipmentId(equipment_id)
    .then((exercises) => {
        res.status(200).send({exercises});
    })
    .catch(next);
}