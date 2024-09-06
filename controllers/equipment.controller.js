const { fetchAllEquipment } = require("../models/equipment.model");

exports.getAllEquipment = (req, res, next) => {
    fetchAllEquipment()
        .then((equipment) => {
            res.status(200).send({ equipment });
        })
        .catch(next);
}