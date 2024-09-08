exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request: Invalid request format.' });
    } else if (err.code === '23502') {
        res.status(400).send({ msg: 'Bad Request: Request body is missing values.' });
    } else if (err.code === '23503') {
        res.status(404).send({ msg: 'Not Found: One or more values do not exist.' });
    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ msg: 'Internal Server Error' });
};
