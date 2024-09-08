const logger = require('../utils/logger');

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        logger.warn(`Custom error: ${err.msg} (status: ${err.status})`);
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err); 
    }
};

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        logger.error(`PostgreSQL error 22P02: Invalid input syntax`);
        res.status(400).send({ msg: 'Bad Request: Invalid request format.' });
    } else if (err.code === '23502') {
        logger.error(`PostgreSQL error 23502: Request body is missing required values.`);
        res.status(400).send({ msg: 'Bad Request: Request body is missing values.' });
    } else if (err.code === '23503') {
        logger.error(`PostgreSQL error 23503: Foreign key violation, one or more values do not exist.`);
        res.status(404).send({ msg: 'Not Found: One or more values do not exist.' });
    } else if (err.code === '23505') {
        logger.error(`PostgreSQL error 23505: Duplicate value detected, constraint violation.`);
        res.status(409).send({ msg: 'Conflict: Duplicate value detected.' });
    } else {
        next(err); 
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    logger.error(`Internal server error: ${err.message}`, { stack: err.stack });
    res.status(500).send({ msg: 'Internal Server Error' });
};