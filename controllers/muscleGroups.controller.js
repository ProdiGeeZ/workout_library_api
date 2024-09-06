const { fetchAllMuscleGroups } = require("../models/muscleGroups.model");

exports.getAllMuscleGroups = (req, res, next) => {
    fetchAllMuscleGroups()
        .then((groups) => {
            res.status(200).send({ groups });
        })
        .catch(next);
}