const db = require("../db/connection");

exports.selectUsers = () => {
  const queryStr = `
        SELECT 
        username, 
        name, 
        email, 
        avatar_img_url,
        education_id,
        settings,
        calendar 
        FROM users;
    `;

  return db.query(queryStr).then(({ rows }) => rows);
};
