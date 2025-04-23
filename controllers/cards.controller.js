const { selectCards } = require("../models/cards.model");

exports.getCards = (req, res, next) => {
    selectCards()
    .then(cards => res.status(200).send({ cards }))
    .catch(err => next(err));
};