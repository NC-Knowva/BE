const db = require("../db/connection");
const { checkExists } = require("./utils.model");

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

exports.selectTopicById = (topic_id) => {
  const queryStr = `SELECT * FROM topics WHERE topic_id = $1;`;
  const promises = [];
  promises.push(checkExists("topics", "topic_id", topic_id));
  promises.unshift(
    db.query(queryStr, [topic_id])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};