const db = require("../connection")
const format = require('pg-format');


const seed = ({games, education_level, users}) => {
    
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
    .then(()=>{
        return db.query(`CREATE TABLE study_group (
            group_name VARCHAR PRIMARY KEY,
            admins JSON,
            users JSON,
            topic_id BIGINT REFERENCES topics(topic_id),
            avatar_img_url TEXT
            );`)                  
    }) 
    .then(()=>{
        return db.query(`CREATE TABLE card_pack (
            pack_id BIGINT PRIMARY KEY,
            username VARCHAR(50),
            topic_id BIGINT,
            name BIGINT,
            description TEXT,
            education_id VARCHAR(50) REFERENCES education_level(education_id),
            visibility BIGINT,
            questions JSON
            );`)                  
    }) 
    .then(()=>{
        return db.query(`CREATE TABLE scoreboard (
            score_id BIGINT PRIMARY KEY,
            username VARCHAR(50),
            game_name VARCHAR(300) REFERENCES games(game_name),
            topic_id BIGINT,
            subject_id BIGINT,
            score JSON
            );`)                  
    })   
      .then(()=>{
        const formattedInsertValues = games.map((game)=>{
          return [game.game_name];
        });
    
        //make a call to format with vlues in games
        const insertQuery = format(`INSERT INTO games
                          (game_name)
                          VALUES
                          %L
                          RETURNING *;`,
                        formattedInsertValues )
        return db.query(insertQuery);
      })
      .then(()=>{
        const formattedInsertValues = education_level.map((education_level)=>{
          return [education_level.education_id,education_level.description ];
        });
    
        //make a call to format with vlues in education_level
        const insertQuery = format(`INSERT INTO education_level
                          (education_id, description)
                          VALUES
                          %L
                          RETURNING *;`,
                        formattedInsertValues )
                        
        return db.query(insertQuery);
      })
      .then(()=>{
        const formattedInsertValues = users.map((user)=>{
          return [user.username,user.name, user.avatar_img_url,user.education_id ];
          //,user.settings, user.calendar
          //,settings, calendar
        });
    
        //make a call to format with vlues in users
        const insertQuery = format(`INSERT INTO users
                          (username,name,avatar_img_url,education_id )
                          VALUES
                          %L
                          RETURNING *;`,
                        formattedInsertValues )
                        
        return db.query(insertQuery);

      })

 
      



}

module.exports = seed;