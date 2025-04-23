const db = require("../db/connection");

exports.selectScoreboard = () => {
    const queryStr = "SELECT * FROM scoreboard";
    return db.query(queryStr).then(({ rows }) => rows);
};