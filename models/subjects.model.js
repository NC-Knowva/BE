const db = require("../db/connection");

exports.selectSubjects = () => {
    const queryStr = "SELECT * FROM subjects";
    return db.query(queryStr).then(({ rows }) => rows);
};

exports.fetchSubjectById = (id) => {
    return db.query(`select * from subjects 
        where subject_id=$1`,[id])
        .then(({rows})=>{
            return rows[0]
        })
}