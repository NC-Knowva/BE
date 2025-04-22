const db = require("../db/connection");

exports.selectGames = () => {
  const queryStr = "SELECT * FROM games";
  return db.query(queryStr).then(({ rows }) => rows);
};
