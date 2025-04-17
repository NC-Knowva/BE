const { selectGames } = require("../models/games.model");

exports.getGames = (req, res) => {
  selectGames().then((games) => res.status(200).send({ games }));
};
