const { fetchAllMuscleGroups } = require("../models/muscleGroups.model");
const logger = require('../utils/logger'); 

exports.getAllMuscleGroups = (req, res, next) => {
    logger.info('Fetching all muscle groups'); 
    fetchAllMuscleGroups()
        .then((groups) => {
            logger.info(`Successfully fetched ${groups.length} muscle groups`); 
            res.status(200).send({ groups });
        })
        .catch((err) => {
            logger.error(`Error fetching muscle groups: ${err.message}`); 
            next(err);
        });
};
