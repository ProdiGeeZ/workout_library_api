const express = require('express');
const logger = require('./utils/logger'); 
const compression = require('compression');
const cors = require('cors');
const documentation = require('./endpoints.json');

const exerciseRouter = require('./routes/exercise.routes');
const equipmentRouter = require('./routes/equipment.routes');
const muscleGroupRouter = require('./routes/muscleGroup.routes');
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require('./errors');

const app = express();
app.use(express.json());
app.use(compression());
app.use(cors());

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/api/exercises', exerciseRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/muscle-groups', muscleGroupRouter);

app.get('/', (req, res) => {
    logger.info('Accessed Documentation Endpoint');
    res.status(200).send({ msg: 'Welcome to the Workout API/', documentation });
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
