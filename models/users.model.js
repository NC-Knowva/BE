const db = require("../db/connection");
const { checkExists } = require("./utils.model");

exports.selectUsers = () => {
  const queryStr = "SELECT * FROM users";
  return db.query(queryStr).then(({ rows }) => rows);
};

exports.selectUserByUsername = (username) => {
  const queryStr = "SELECT * FROM users WHERE username = $1";
  const promises = [];
  promises.push(checkExists("users", "username", username));
  promises.unshift(
    db.query(queryStr, [username])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.selectMessagesByUsername = (username) => {
  const queryStr = `
        SELECT * FROM message_activity 
        WHERE sender_username = $1 OR receiver_username = $1
        ORDER BY created_at DESC
        `;
  const promises = [];
  promises.push(checkExists("users", "username", username));
  promises.unshift(
    db.query(queryStr, [username])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.selectStudyGroupsByUsername = (username) => {
  const queryStr = `
        SELECT 
            study_group.group_id, 
            study_group.study_group, 
            study_group.subject_id, 
            study_group.avatar_img_url, 
            study_group.created_at,
            users_group_junction.username,
            users_group_junction.role
        FROM study_group 
        JOIN users_group_junction ON study_group.group_id = users_group_junction.group_id
        WHERE users_group_junction.username = $1
        ORDER BY study_group.created_at DESC;
    `;

  const promises = [];
  promises.push(checkExists("users", "username", username));
  promises.unshift(
    db.query(queryStr, [username])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.fetchUserFriends = async (username) => {
  const checkUser = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);

  if (checkUser.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "user not found" });
  }
  return db.query('SELECT friend FROM friends WHERE username =$1', [username])
    .then(({ rows }) => {
      return rows
    })
}


exports.insertUser = (username, name, avatar_img_url, education_id) => {
  const queryStr = `
    INSERT INTO users (username, name, avatar_img_url, education_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  return db.query(queryStr, [username, name, avatar_img_url, education_id])
    .then(({ rows }) => rows[0]);
};

exports.updateUser = (username, name, avatar_img_url, education_id) => {
  const queryStr = `
      UPDATE users
      SET name = $1,
          avatar_img_url =$2,
          education_id = $3
      WHERE username = $4
      RETURNING *`;

  return checkExists("users", "username", username)
    .then(() => db.query(queryStr, [name, avatar_img_url, education_id, username]))
    .then(({ rows }) => rows[0]);
};
