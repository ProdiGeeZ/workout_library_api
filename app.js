const express = require('express');
const app = express();
const exerciseRouter = require('./routes/exercise.routes');
const equipmentRouter = require('./routes/equipment.routes');
const muscleGroupRouter = require('./routes/muscleGroup.routes');
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require('./errors');

app.use(express.json());

app.use('/api/exercises', exerciseRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/muscle-groups', muscleGroupRouter);

app.get('/', (req, res) => res.status(200).send({ msg: 'Welcome to the Workout API' }));

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
