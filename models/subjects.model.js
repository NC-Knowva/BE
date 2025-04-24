const db = require("../db/connection");

exports.selectSubjects = (filter_by) => {
  const queryStr = "SELECT * FROM subjects";
  return db.query(queryStr).then(({ rows }) => {
    if (filter_by === undefined) {
      return rows;
    } else {
      return rows.filter((elem) => {
        return elem.education_id === filter_by;
      });
    }
  });
};

