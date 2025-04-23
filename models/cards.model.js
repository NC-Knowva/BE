const db = require("../db/connection");

exports.selectCards = () => {
    const queryStr = "SELECT * FROM card_pack";
    return db.query(queryStr).then(({ rows }) => rows);
};