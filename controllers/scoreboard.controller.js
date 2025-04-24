const { selectScoreboard } = require("../models/scoreboard.model");

exports.getScoreboard = (req, res,next) => {
    selectScoreboard()
    .then(scoreboard => res.status(200).send({ scoreboard }))
    .catch(err => next(err));
};