const db = require("../db/connection");
const { checkExists } = require("./utils.model");

exports.selectCards = () => {
    const queryStr = "SELECT * FROM card_pack";
    return db.query(queryStr).then(({ rows }) => rows);
};

exports.selectCardByName = (name) => {
    const queryStr = "SELECT * FROM card_pack WHERE name = $1";
    const promises = [];
    promises.push(checkExists("card_pack", "name", name));
    promises.unshift(
      db.query(queryStr, [name])
    );
    return Promise.all(promises).then((data) => {
      return data[0];
    });
};
