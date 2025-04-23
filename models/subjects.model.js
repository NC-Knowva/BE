const db = require("../db/connection");

exports.selectSubjects = () => {
    const queryStr = "SELECT * FROM subjects";
    return db.query(queryStr).then(({ rows }) => rows);
};

exports.fetchSubjectById = (id) => {
    return db.query(`select * from subjects 
        where subject_id=$1`, [id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "not found" })
            }
            return rows[0]
        })
}

exports.acceptSubject = (subject_name, education_id) => {
    return db.query(`insert into subjects
        (subject_name, education_id)
        values
        ($1, $2)
        returning *`,[subject_name,education_id])
        .then(({rows})=>{
            return rows[0]
        })
}
// exports.insertTopic = (topic_name, education_id, subject_id) => {
//   const queryStr = `
//     INSERT INTO topics (topic_name, education_id, subject_id)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//   `;

//   return db.query(queryStr, [topic_name, education_id, subject_id])
//   .then(({ rows }) => rows[0]);
// };