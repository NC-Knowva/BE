const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require('../db/data/test-data/index.js');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("games table", () => {
    test("games table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                SELECT FROM 
                    information_schema.tables 
                WHERE 
                    table_name = 'games'
                );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test("games table has game_name column as varchar", () => {
      return db
        .query(
          `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'games'
                    AND column_name = 'game_name';`
        )
        .then(({ rows: [column] }) => {

            expect(column.column_name).toBe('game_name');
            expect(column.data_type).toBe('character varying');
          });
    })
    test('games table has game_name column as the primary key', () => {
        return db
          .query(
            `SELECT column_name
                      FROM information_schema.table_constraints AS tc
                      JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                      WHERE tc.constraint_type = 'PRIMARY KEY'
                      AND tc.table_name = 'games';`
          )
          .then(({ rows: [{ column_name }] }) => {
            expect(column_name).toBe('game_name');
          });
      });

    test("games table has subject_name column as varchar", () => {
    return db
        .query(
        `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'games'
                    AND column_name = 'subject_name';`
        )
        .then(({ rows: [column] }) => {

            expect(column.column_name).toBe('subject_name');
            expect(column.data_type).toBe('character varying');
        });
    })

    test("games table has game_type column as varchar", () => {
        return db
            .query(
            `SELECT *
                        FROM information_schema.columns
                        WHERE table_name = 'games'
                        AND column_name = 'game_type';`
            )
            .then(({ rows: [column] }) => {
    
                expect(column.column_name).toBe('game_type');
                expect(column.data_type).toBe('character varying');
            });
        })
    test("games table has topic_name column as varchar", () => {
        return db
            .query(
            `SELECT *
                        FROM information_schema.columns
                        WHERE table_name = 'games'
                        AND column_name = 'topic_name';`
            )
            .then(({ rows: [column] }) => {

                expect(column.column_name).toBe('topic_name');
                expect(column.data_type).toBe('character varying');
            });
        })
        

    test("games table has auto_generated_code column as varchar", () => {
        return db
            .query(
            `SELECT *
                        FROM information_schema.columns
                        WHERE table_name = 'games'
                        AND column_name = 'auto_generated_code';`
            )
            .then(({ rows: [column] }) => {

                expect(column.column_name).toBe('auto_generated_code');
                expect(column.data_type).toBe('character varying');
            });
        })

})


  ///////education level
  describe("education_level table", () => {
    test("education_level table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
                SELECT FROM 
                    information_schema.tables 
                WHERE 
                    table_name = 'education_level'
                );`
        )
        .then(({ rows: [{ exists }] }) => {
            expect(exists).toBe(true);
          });
    })
    test('education_level table has education_id column as varchar',()=>{
        return db.query(
            `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'education_level'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('education_id');
            expect(column.data_type).toBe('character varying');
          });
    })
    test('education_level table has education_id column as the primary key', () => {
        return db
          .query(
            `SELECT column_name
                      FROM information_schema.table_constraints AS tc
                      JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                      WHERE tc.constraint_type = 'PRIMARY KEY'
                      AND tc.table_name = 'education_level';`
          )
          .then(({ rows: [{ column_name }] }) => {
            expect(column_name).toBe('education_id');
          });
      });
    test('education_level table has description column as text',()=>{
        return db.query(
            `SELECT column_name, data_type

                    FROM information_schema.columns
                    WHERE table_name = 'education_level'
                    AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("character varying");
        });
    });
  });


//users
describe('users table',()=>{
    test('users table exists',()=>{
        return db
        .query(
          `SELECT EXISTS (
                SELECT FROM 
                    information_schema.tables 
                WHERE 
                    table_name = 'users'
                );`
        )
        .then(({ rows: [{ exists }] }) => {
            expect(exists).toBe(true);
          });
    })
    test('users table has username column as varchar',()=>{
        return db.query(
            `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('username');
            expect(column.data_type).toBe('character varying');
          });
    })

    test('users table has username column as the primary key', () => {
        return db
          .query(
            `SELECT column_name
                      FROM information_schema.table_constraints AS tc
                      JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                      WHERE tc.constraint_type = 'PRIMARY KEY'
                      AND tc.table_name = 'users';`
          )
          .then(({ rows: [{ column_name }] }) => {
            expect(column_name).toBe('username');
          });
        })

    test('users table has name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('name');
            expect(column.data_type).toBe('character varying');
          });
    })


    test('users table has time_stamp column as timestamp',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'time_stamp';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('time_stamp');
            expect(column.data_type).toBe('timestamp without time zone');
          });
    })

    test('users table has avatar_img_url column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'avatar_img_url';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('avatar_img_url');
            expect(column.data_type).toBe('character varying');
            expect(column.character_maximum_length).toBe(1000);
          });
    })


    test('users table has education_id column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('education_id');
            expect(column.data_type).toBe('character varying');
          });
    })
    
    test('users table has settings column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'settings';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('settings');
            expect(column.data_type).toBe('json');
          });
        })

    test('users table has calendar column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'calendar';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('calendar');
            expect(column.data_type).toBe('json');
            });
        })    
    })

describe('message_activity',()=>{
test('message_activity table exists',()=>{
    return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'message_activity'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

test('message_activity table has dm_id column as the primary key', () => {
    return db
        .query(
        `SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'message_activity';`
        )
        .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe('dm_id');
        });
    });
test('message_activity table has dm_id column as bigint',()=>{
    return db.query(
        `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'message_activity'
                AND column_name = 'dm_id';`
    )
    .then(({ rows: [column] }) => {
        expect(column.column_name).toBe('dm_id');
        expect(column.data_type).toBe('bigint');
        });
    })       

    test('message_activity table has time_stamp column as timestamp',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'message_activity'
                    AND column_name = 'time_stamp';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('time_stamp');
            expect(column.data_type).toBe('timestamp without time zone');
            });
        })   

test('message_activity table has sender_username column as VARCHAR',()=>{
    return db.query(
        `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'message_activity'
                AND column_name = 'sender_username';`
    )
    .then(({ rows: [column] }) => {
        expect(column.column_name).toBe('sender_username');
        expect(column.data_type).toBe('character varying');
        });
    })  
test('message_activity table has receiver_username column as VARCHAR',()=>{
return db.query(
    `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'message_activity'
            AND column_name = 'receiver_username';`
)
.then(({ rows: [column] }) => {
    expect(column.column_name).toBe('receiver_username');
    expect(column.data_type).toBe('character varying');
    });
})  

test('message_activity table has body column as text',()=>{
    return db.query(
        `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'message_activity'
                AND column_name = 'body';`
    )
    .then(({ rows: [column] }) => {
        expect(column.column_name).toBe('body');
        expect(column.data_type).toBe('text');
        });
    })  


})

describe('subjects',()=>{
    test('subjects table exists',()=>{
    return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'subjects'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

    test('subjects table has subject_id column as primary key',()=>{
    return db
        .query(
        `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'subjects';`
        )
        .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe('subject_id');
        });
    })

    test('subjects table has subject_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'subjects'
                    AND column_name = 'subject_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('subject_id');
            expect(column.data_type).toBe('bigint');
          });
    })

    test('subjects table has subject_name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'subjects'
                    AND column_name = 'subject_name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('subject_name');
            expect(column.data_type).toBe('character varying');
          });
    })

    test('subjects table has education_id column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'subjects'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('education_id');
            expect(column.data_type).toBe('character varying');
          });
    })
    
})

describe('topics',()=>{
    test('topics table exists',()=>{
        return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'topics'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

    test('topics table has topic_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'topics'
                    AND column_name = 'topic_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('topic_id');
            expect(column.data_type).toBe('bigint');
          });
    })   

    test('topics table has topic_id column as primary key',()=>{
        return db
            .query(
            `SELECT column_name
                FROM information_schema.table_constraints AS tc
                JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                WHERE tc.constraint_type = 'PRIMARY KEY'
                AND tc.table_name = 'topics';`
            )
            .then(({ rows: [{ column_name }] }) => {
            expect(column_name).toBe('topic_id');
            });
        })

    test('topics table has topic_name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'topics'
                    AND column_name = 'topic_name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('topic_name');
            expect(column.data_type).toBe('character varying');
          });
    })    

    test('topics table has education_id column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'topics'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('education_id');
            expect(column.data_type).toBe('character varying');
          });
    })    

    test('topics table has subject_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'topics'
                    AND column_name = 'subject_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('subject_id');
            expect(column.data_type).toBe('bigint');
          });
    })  
})

describe('study_group',()=>{

    test('study_group table exists',()=>{
        return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'study_group'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

    test('study_group table has group_name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'group_name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('group_name');
            expect(column.data_type).toBe('character varying');
          });
    })  

    test('study_group table has group_name column as primary key',()=>{
    return db
        .query(
        `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'study_group';`
        )
        .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe('group_name');
        });
    })


    test('study_group table has admins column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'admins';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('admins');
            expect(column.data_type).toBe('json');
          });
    }) 


    test('study_group table has admins column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'admins';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('admins');
            expect(column.data_type).toBe('json');
          });
    }) 

    test('study_group table has topic_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'topic_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('topic_id');
            expect(column.data_type).toBe('bigint');
          });
    }) 

    test('study_group table has avatar_img_url column as text',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'avatar_img_url';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('avatar_img_url');
            expect(column.data_type).toBe('text');
          });
    }) 

    test('study_group table has time_stamp column as timestamp',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'study_group'
                    AND column_name = 'time_stamp';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('time_stamp');
            expect(column.data_type).toBe('timestamp without time zone');
          });
    }) 

})

describe('card_pack',()=>{
    test('card_pack table exists',()=>{
        return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'card_pack'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

    test('card_pack table has pack_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'pack_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('pack_id');
            expect(column.data_type).toBe('bigint');
          });
    }) 

    test('card_pack table has pack_id column as primary key',()=>{
    return db
        .query(
        `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'card_pack';`
        )
        .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe('pack_id');
        });
    })
    
    test('card_pack table has username column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('username');
            expect(column.data_type).toBe('character varying');
          });
    }) 

    test('card_pack table has topic_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'topic_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('topic_id');
            expect(column.data_type).toBe('bigint');
          });
    }) 

    test('card_pack table has name column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('name');
            expect(column.data_type).toBe('bigint');
          });
    }) 

    test('card_pack table has description column as text',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('description');
            expect(column.data_type).toBe('text');
          });
    }) 

    test('card_pack table has education_id column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('education_id');
            expect(column.data_type).toBe('character varying');
          });
    }) 

    test('card_pack table has visibility column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'visibility';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('visibility');
            expect(column.data_type).toBe('bigint');
          });
    })

    test('card_pack table has questions column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'card_pack'
                    AND column_name = 'questions';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('questions');
            expect(column.data_type).toBe('json');
          });
    })
})

describe('scoreboard',()=>{
    test('scoreboard table exists',()=>{
        return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'scoreboard'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })


    test('scoreboard table has score_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'scoreboard'
                    AND column_name = 'score_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('score_id');
            expect(column.data_type).toBe('bigint');
          });
    }) 

    test('scoreboard table has score_id column as primary key',()=>{
        return db
            .query(
            `SELECT column_name
                FROM information_schema.table_constraints AS tc
                JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                WHERE tc.constraint_type = 'PRIMARY KEY'
                AND tc.table_name = 'scoreboard';`
            )
            .then(({ rows: [{ column_name }] }) => {
            expect(column_name).toBe('score_id');
            });
        })


    test('scoreboard table has username column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'scoreboard'
                    AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('username');
            expect(column.data_type).toBe('character varying');
            });
    }) 


    test('scoreboard table has game_name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'scoreboard'
                    AND column_name = 'game_name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('game_name');
            expect(column.data_type).toBe('character varying');
            });
    }) 

    test('scoreboard table has topic_id column as bigint',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'scoreboard'
                    AND column_name = 'topic_id';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('topic_id');
            expect(column.data_type).toBe('bigint');
            });
    }) 

    test('scoreboard table has subject_id column as bigint',()=>{
    return db.query(
        `SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = 'scoreboard'
                AND column_name = 'subject_id';`
    )
    .then(({ rows: [column] }) => {
        expect(column.column_name).toBe('subject_id');
        expect(column.data_type).toBe('bigint');
        });
    }) 
    
    test('scoreboard table has score column as json',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'scoreboard'
                    AND column_name = 'score';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('score');
            expect(column.data_type).toBe('json');
            });
        }) 
})

describe('users_group_junction',()=>{
    test('users_group_junction table exists',()=>{
        return db
    .query(
        `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'users_group_junction'
            );`
    )
    .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
        });
    })

//role username group

    test('users_group_junction table has role column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users_group_junction'
                    AND column_name = 'role';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('role');
            expect(column.data_type).toBe('character varying');
          });
    }) 

    test('users_group_junction table has username column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users_group_junction'
                    AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('username');
            expect(column.data_type).toBe('character varying');
          });
    }) 


    test('users_group_junction table has group_name column as varchar',()=>{
        return db.query(
            `SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'users_group_junction'
                    AND column_name = 'group_name';`
        )
        .then(({ rows: [column] }) => {
            expect(column.column_name).toBe('group_name');
            expect(column.data_type).toBe('character varying');
          });
    }) 

})

describe('Data Insertion',()=>{
    test('games data has been inserted correctly', () => {
        return db.query(
            `SELECT * FROM games;`)
            .then(({ rows: games }) => {
          expect(games).toHaveLength(2);
          games.forEach((game) => {
            expect(game).toHaveProperty('game_name');
          });
        });
      });

      test.skip('education_level data has been inserted correctly', () => {
        return db.query(`SELECT * FROM education_level;`).then(({ rows: education_level }) => {
          expect(education_level).toHaveLength(1);
          education_level.forEach((education_level) => {
            expect(education_level).toHaveProperty('education_id');
            expect(education_level).toHaveProperty('description');
          });
        });
      });

      test.skip('users data has been inserted correctly', () => {
        return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
          expect(users).toHaveLength(10);
          users.forEach((user) => {
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('avatar_img_url');
            expect(user).toHaveProperty('education_id');
            expect(user).toHaveProperty('settings');
            expect(user).toHaveProperty('calendar');
          });
        });
      });


});


});
