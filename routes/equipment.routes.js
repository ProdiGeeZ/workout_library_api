const express = require('express');
const { getAllEquipment } = require('../controllers/equipment.controller');

const router = express.Router();

router.get('/', getAllEquipment);

module.exports = router;