const db = require("../db/connection");

exports.selectTopics = () => {
    const queryStr = "SELECT * FROM topics";
    return db.query(queryStr).then(({ rows }) => rows);
};

exports.insertTopic = (topic_name, education_id, subject_id) => {
  const queryStr = `
    INSERT INTO topics (topic_name, education_id, subject_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  return db.query(queryStr, [topic_name, education_id, subject_id])
  .then(({ rows }) => rows[0]);
};