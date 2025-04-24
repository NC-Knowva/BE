const db = require("../db/connection");
const { checkExists } = require("./utils.model");

exports.selectGroupById = (id) => {
  const queryStr = "SELECT * FROM study_group WHERE group_id = $1";
  const promises = [];
  promises.push(checkExists("study_group", "group_id", id));
  promises.unshift(db.query(queryStr, [id]));
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.selectStudyGroups = () => {
  const queryStr = "SELECT * FROM study_group";
  return db.query(queryStr).then(({ rows }) => rows);
};
