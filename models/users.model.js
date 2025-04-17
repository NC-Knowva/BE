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
