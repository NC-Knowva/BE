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
    .then(()=>{
        return db.query(`CREATE TABLE users (
            username VARCHAR(50) PRIMARY KEY,
            name VARCHAR(300),
            password bigint,
            email VARCHAR(300),
            avatar_img_url VARCHAR(1000),
            education_id VARCHAR(50) REFERENCES education_level(education_id),
            settings JSON,
            calendar JSON
            );`)   
           
    })
    .then(()=>{
        return db.query(`CREATE TABLE message_activity (
            dm_id BIGINT PRIMARY KEY,
            sender_username VARCHAR(50) REFERENCES users(username),
            receiver_username VARCHAR(50) REFERENCES users(username),
            body TEXT
            );`)                  
    })  
    .then(()=>{
        return db.query(`CREATE TABLE subjects (
            subject_id BIGINT PRIMARY KEY,
            subject_name VARCHAR(50),
            education_id VARCHAR(50) REFERENCES education_level(education_id)
            );`)                  
    })  
    .then(()=>{
        return db.query(`CREATE TABLE topics (
            topic_id BIGINT PRIMARY KEY,
            topic_name VARCHAR(50),
            education_id VARCHAR(50) REFERENCES education_level(education_id),
            subject_id BIGINT REFERENCES subjects(subject_id)
            );`)                  
    }) 
  


}

module.exports = seed;