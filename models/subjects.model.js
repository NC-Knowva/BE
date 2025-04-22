const db = require("../db/connection");

exports.selectSubjects = () => {
    const queryStr = "SELECT * FROM subjects";
    return db.query(queryStr).then(({ rows }) => rows);
};