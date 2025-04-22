const db = require("../connection")
const format = require('pg-format');
const { topicsLookup, subjectsLookup, } = require('./utils')
const { formatTopicsSubjects, formatScoreboardGames, formatUsersGroup, formaCardPackTopics, formatStudyGroupSubjects } = require('./utils')


const seed = ({ games, education_level, users, message_activity, scoreboard, study_group, topics, user_group_junction, subjects, card_pack, friends }) => {
    let topicsInserted
    let subjectsInserted

    return db.query("DROP TABLE IF EXISTS scoreboard")
        .then(() => {
            return db.query("DROP TABLE IF EXISTS card_pack")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS users_group_junction")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS study_group")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS topics")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS subjects")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS message_activity")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS friends")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS users")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS education_level")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS games")
        })
        .then(() => {
            return db.query(`CREATE TABLE games (
            game_id SERIAL PRIMARY KEY,
            game_name VARCHAR(300),
            game_type VARCHAR(50),
            subject_name VARCHAR(50),
            username VARCHAR(50),
            topic_name VARCHAR(50),
            auto_generated_code VARCHAR(50),
            created_at TIMESTAMP);`)
        })
        .then(() => {
            return db.query(`CREATE TABLE education_level (
            education VARCHAR(50) PRIMARY KEY)`)
        })
        .then(() => {
            return db.query(`CREATE TABLE users (
            username VARCHAR(50) PRIMARY KEY,
            name VARCHAR(300),
            avatar_img_url VARCHAR(1000),
            education_id VARCHAR(50) REFERENCES education_level(education),
            settings JSON,
            calendar JSON,
            created_at TIMESTAMP
            );`)

        })
        .then(() => {
            return db.query(`CREATE TABLE friends (
                friend_id SERIAL PRIMARY KEY,
                username VARCHAR(50) REFERENCES users(username),
                friend VARCHAR(50) REFERENCES users(username),
                created_at TIMESTAMP
                )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE message_activity (
            dm_id SERIAL PRIMARY KEY,
            sender_username VARCHAR(50) REFERENCES users(username),
            receiver_username VARCHAR(50) REFERENCES users(username),
            body TEXT,
            created_at TIMESTAMP
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE subjects (
            subject_id SERIAL PRIMARY KEY,
            subject_name VARCHAR(50),
            education_id VARCHAR(50) REFERENCES education_level(education)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE topics (
            topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(50),
            education_id VARCHAR(50) REFERENCES education_level(education),
            subject_id INT REFERENCES subjects(subject_id)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE study_group (
            group_id  SERIAL PRIMARY KEY,
            group_name VARCHAR(100),
            subject_id INT REFERENCES subjects(subject_id),
            avatar_img_url TEXT,
            created_at TIMESTAMP
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE card_pack (
            pack_id SERIAL PRIMARY KEY,
            username VARCHAR(50) REFERENCES users(username) ,
            topic_id INT REFERENCES topics(topic_id),
            name VARCHAR(150),
            description TEXT,
            education_id VARCHAR(50) REFERENCES education_level(education),
            visibility BOOLEAN,
            questions JSON 
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE scoreboard (
            score_id SERIAL PRIMARY KEY,
            username VARCHAR(50) REFERENCES users(username),
            game_id INT REFERENCES games(game_id),
            topic_id INT REFERENCES topics(topic_id),
            subject_id INT REFERENCES subjects(subject_id),
            score JSON,
            created_at TIMESTAMP
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE users_group_junction (
        users_group_id serial primary key,
        role VARCHAR(50),
        username VARCHAR(50) REFERENCES users(username),
        group_id INT REFERENCES study_group(group_id)
        );`)
        })
        .then(() => {
            const formattedInsertValues = education_level.map((educations) => {
                return [educations.education];
            });
            const insertQuery = format(`INSERT INTO education_level
                (education)
                VALUES
                %L
                RETURNING *;`,
                formattedInsertValues)
            return db.query(insertQuery);
        })
        .then(() => {
            const formattedInsertValues = users.map((user) => {
                return [user.username, user.name, user.avatar_img_url, user.education, user.created_at];
            });
            const insertQuery = format(`INSERT INTO users
                    (username,name,avatar_img_url,education_id, created_at )
                    VALUES
                    %L
                    RETURNING *;`,
                formattedInsertValues)
            return db.query(insertQuery);
        })
        .then(() => {
            const formattedInsertValues = message_activity.map((message) => {
                return [message.sender_username, message.receiver_username, message.body, message.created_at]
            })
            const insertQuery = format(`insert into message_activity 
                        (sender_username,receiver_username,body,created_at)
                        values
                        %L
                        returning *`, formattedInsertValues)

            return db.query(insertQuery)
        })
        .then(() => {
            const formattedInsertValues = subjects.map((sub) => {
                return [sub.subject_name, sub.education]
            })
            const insertQuery = format(`insert into subjects
                (subject_name, education_id)
                values
                %L
                returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
        .then((insertedSubject) => {
            subjectsInserted = insertedSubject.rows
            const formattedInsertValues = formatTopicsSubjects(topics, subjectsInserted).map((topic) => {
                return [topic.topic_name, topic.education, topic.subject_id]
            })
            const insertQuery = format(`insert into topics
                    (topic_name, education_id, subject_id)
                    values 
                    %L
                    returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
        .then((tops) => {
            topicsInserted = tops.rows
            const formattedInsertValues = formatStudyGroupSubjects(study_group, subjectsInserted).map((study) => {
                return [study.study_group, study.subject_id, study.avatar_img_url, study.created_at]
            })
            const insertQuery = format(`insert into study_group
                        (group_name,subject_id,avatar_img_url,created_at)
                        values
                        %L
                        returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
        .then((insertedGroups) => {

            const formattedInsertValues = formatUsersGroup(user_group_junction, insertedGroups.rows).map((users) => {
                return [users.username, users.group_id, users.role]
            })
            const insertQuery = format(`insert into users_group_junction
                                    (username, group_id, role)
                                    values
                                    %L
                                    returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
        .then(() => {
            const formattedInsertValues = formaCardPackTopics(card_pack, topicsInserted).map((card) => {
                return [card.username, card.topic_id, card.name, card.description, card.education, card.visibility, card.questions]
            })
            const insertQuery = format(`insert into card_pack
                            (username,topic_id,name,description,education_id,visibility,questions)
                            values
                            %L
                            returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
        .then(() => {
            const formattedInsertValues = games.map((game) => {
                return [game.game_name, game.username, game.game_type, game.subject, game.topic, game.autoGeneratedCode, game.created_at];
            });

            const insertQuery = format(`INSERT INTO games
                                (game_name, username, game_type, subject_name, topic_name, auto_generated_code, created_at)
                                VALUES
                                %L
                                RETURNING *;`,
                formattedInsertValues)
            return db.query(insertQuery);
        })
        .then((gamesData) => {
            const top = topicsLookup(topicsInserted)
            const sub = subjectsLookup(subjectsInserted)

            const formattedInsertValues = formatScoreboardGames(scoreboard, gamesData.rows).map((scoreb) => {
                return [
                    scoreb.username, scoreb.game_id, scoreb[top.topic_id], scoreb[sub.subject_id], scoreb.score, scoreb.created_at
                ]
            })
            const insertQuery = format(`insert into scoreboard 
                                    (username,game_id,topic_id,subject_id,score, created_at)
                                    values
                                    %L
                                    returning *;`, formattedInsertValues)


            return db.query(insertQuery)
        })
        .then(() => {
            const formattedInsertValues = friends.map((friendd) => {
                return [friendd.username, friendd.friend, friendd.created_at]
            })
            const insertQuery = format(`insert into friends
        (username, friend, created_at)
        values
        %L
        returning *`, formattedInsertValues)
            return db.query(insertQuery)
        })
}

module.exports = seed;