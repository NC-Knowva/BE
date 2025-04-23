exports.invalidPathController = (req, res, next) => {
    res.status(404).send({ msg: 'Invalid URL' });
};

exports.psqlErrorHandler = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: 'Bad request' });
    } else if (err.code === "23503") {
        res.status(400).send({ msg: 'Foreign key violation' });
    } else if (err.code === "23505") {
        res.status(400).send({ msg: err.detail });
    } else {
        next(err);
    }
};

exports.customErrorHandler = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.serverErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
};