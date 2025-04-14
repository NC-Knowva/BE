const db = require("../connection")
const format = require('pg-format');


const seed = () => {
    return db.query("DROP TABLE IF EXISTS scoreboard") //<< dropping users table
    .then(()=>{
    return db.query("DROP TABLE IF EXISTS card_pack")
    })
    .then(()=>{    
    return db.query("DROP TABLE IF EXISTS study_group")  
    })  
    .then(()=>{    
    return db.query("DROP TABLE IF EXISTS topics")    
    })
    .then(()=>{
    return db.query("DROP TABLE IF EXISTS subjects")    
    })
    .then(()=>{
    return db.query("DROP TABLE IF EXISTS message_activity")    
    })
    .then(()=>{
        return db.query("DROP TABLE IF EXISTS users") 
    })
    .then(()=>{
    return db.query("DROP TABLE IF EXISTS education_level")
    })
    .then(()=>{
        return db.query("DROP TABLE IF EXISTS games") 
    })
    .then(()=>{
        return db.query(`CREATE TABLE games (
            game_name VARCHAR(300) PRIMARY KEY);`)
    })
    .then(()=>{
        return db.query(`CREATE TABLE education_level (
            education_id VARCHAR(50) PRIMARY KEY,
            description VARCHAR(300));`)
    })  

}

module.exports = seed;