const { selectCards, selectCardByName } = require("../models/cards.model");

exports.getCards = (req, res, next) => {
    selectCards()
    .then(cards => res.status(200).send({ cards }))
    .catch(err => next(err));
};

exports.getCardByName = (req, res, next) => {
    const { name } = req.params;
    selectCardByName(name)
    .then(({ rows }) => {
        res.status(200).send({ card: rows[0] });
      })
    .catch(err => next(err));
};
