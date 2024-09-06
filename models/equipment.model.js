const db = require('../db/connection');

exports.fetchAllEquipment = (req, res, next) => {
    return db.query(`SELECT * FROM equipment;`)
        .then((result) => {
            return result.rows;
        });
};