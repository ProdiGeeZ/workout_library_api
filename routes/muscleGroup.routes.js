const express = require('express');
const { getAllMuscleGroups } = require('../controllers/muscleGroups.controller');

const router = express.Router();

router.get('/', getAllMuscleGroups);

module.exports = router;
