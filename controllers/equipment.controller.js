const { fetchAllEquipment } = require("../models/equipment.model");
const logger = require('../utils/logger'); 

exports.getAllEquipment = (req, res, next) => {
    logger.info('Fetching all equipment'); 
    fetchAllEquipment()
        .then((equipment) => {
            logger.info(`Successfully fetched ${equipment.length} pieces of equipment`);
            res.status(200).send({ equipment });
        })
        .catch((err) => {
            logger.error(`Error fetching equipment: ${err.message}`); 
            next(err);
        });
};