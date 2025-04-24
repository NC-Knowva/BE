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
}

exports.selectStudyGroups = async (subject) => {
  if (subject !== undefined) {
    const checkSubjectExists = await db.query(
      `SELECT * FROM study_group WHERE subject_id = $1`,
      [subject]
    )

    if (checkSubjectExists.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }

    return db
      .query(`SELECT * FROM study_group WHERE subject_id = $1`, [subject])
      .then(({ rows }) => rows);
  }

  return db.query(`SELECT * FROM study_group`).then(({ rows }) => rows)
}