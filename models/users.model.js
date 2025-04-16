const db = require("../db/connection");

exports.selectUsers = () => {
  const queryStr = `
        SELECT 
        username, 
        name, 
        avatar_img_url,
        education_id,
        settings,
        calendar,
        time_stamp 
        FROM users;
    `;

  return db.query(queryStr).then(({ rows }) => rows);
};
