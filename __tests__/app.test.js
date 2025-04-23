const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection");
const { json } = require("express");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("ALL /notAPath", () => {
  test("404: Responds with 'Invalid URL' when attempting to access a non-existent endpoint", () => {
    return request(app)
      .get("/notAPath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid URL");
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with all users", () => {
    const expectedUser = {
      username: expect.any(String),
      name: expect.any(String),
      avatar_img_url: expect.any(String),
      education_id: expect.any(String),
      settings: expect.any(Object),
      calendar: expect.any(Object),
      created_at: expect.any(String),
    };

    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(10);
        users.forEach((user) => {
          expect(user).toMatchObject(expectedUser);
        });
      });
  });
});

describe("GET /api/users/:username", () => {
  test("200: Responds with a user with given username", () => {
    const expectedUser = {
      username: "aclaricoats0",
      name: "Addia Claricoats",
      avatar_img_url:
        "https://robohash.org/verodoloremfuga.png?size=50x50&set=set1",
      education_id: "one",
      settings: expect.any(Object),
      calendar: expect.any(Object),
      created_at: expect.any(String),
    };

    return request(app)
      .get("/api/users/aclaricoats0")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject(expectedUser);
      });
  });

  test("404: Responds with 'Resource Not Found' when given a valid username that is not in the database", () => {
    return request(app)
      .get("/api/users/aclaricoats")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource Not Found");
      });
  });
});

describe("GET /api/games", () => {
  test("200: Responds with a list of all games", () => {
    return request(app)
      .get("/api/games")
      .expect(200)
      .then(({ body }) => {
        expect(body.games).toEqual([
          {
            game_id: 1,
            game_type: "type1",
            game_name: "game 1",
            subject_name: "one",
            username: "aclaricoats0",
            topic_name: "topic 1",
            auto_generated_code: "879427",
            created_at: "2023-04-30T23:00:00.000Z",
          },
          {
            game_id: 2,
            game_type: "type2",
            game_name: "game 2",
            subject_name: "two",
            username: "ogladyer1",
            topic_name: "topic 2",
            auto_generated_code: "398247",
            created_at: "2023-05-01T23:00:00.000Z",
          },
        ]);
      });
  });
});

describe("GET /api/users/:username/messages", () => {
  test("200: Responds with an array of messages for the given username, sorted by most recent first", () => {
    const expectedMessage = {
      sender_username: expect.any(String),
      receiver_username: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
    };

    return request(app)
      .get("/api/users/eforgan9/messages")
      .expect(200)
      .then(({ body: { messages } }) => {
        expect(messages.length).toBe(5);
        expect(messages).toBeSortedBy("created_at", { descending: true });
        messages.forEach((message) => {
          expect(message).toMatchObject(expectedMessage);
        });
      });
  });

  test("200: Responds with an empty array when a user has no messages", () => {
    return request(app)
      .get("/api/users/ktrevaskiss6/messages")
      .expect(200)
      .then(({ body: { messages } }) => {
        expect(messages.length).toBe(0);
        expect(messages).toEqual([]);
      });
  });
});

describe("GET /api/users/:username/study_groups", () => {
  test("200: Responds with an array of study groups for the given username, sorted by most recent first", () => {
    const expectedStudyGroup = {
      group_id: expect.any(Number),
      study_group: expect.any(String),
      subject_id: expect.any(Number),
      avatar_img_url: expect.any(String),
      created_at: expect.any(String),
      username: expect.any(String),
      role: expect.any(String),
    };

    return request(app)
      .get("/api/users/acranham7/study_groups")
      .expect(200)
      .then(({ body: { study_groups } }) => {
        expect(study_groups.length).toBe(4);
        expect(study_groups).toBeSortedBy("created_at", { descending: true });
        study_groups.forEach((study_group) => {
          expect(study_group).toMatchObject(expectedStudyGroup);
        });
      });
  });

  test.skip("200: Responds with an empty array when a user has no study groups", () => {
    return request(app)
      .get("/api/users/aclaricoats0/study_groups")
      .expect(200)
      .then(({ body: { study_groups } }) => {
        expect(study_groups.length).toBe(0);
        expect(study_groups).toEqual([]);
      });
  });
});
describe("GET /api/subjects", () => {
  //here
  test("200: Responds with an array of object with subject details.", () => {
    return request(app)
      .get("/api/subjects")
      .expect(200)
      .then(({ body }) => {
        const subjects = body.subjects;
        expect(subjects.length).toBe(5);

        subjects.forEach((subject) => {
          expect(subject).toMatchObject({
            subject_id: expect.any(Number),
            subject_name: expect.any(String),
            education_id: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of object with topic details.", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(topics.length).toBe(6);

        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            topic_id: expect.any(Number),
            subject_id: expect.any(Number),
            topic_name: expect.any(String),
            education_id: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/cards", () => {
  test("200: Responds with an array of objects with Card details.", () => {
    return request(app)
      .get("/api/cards")
      .expect(200)
      .then(({ body }) => {
        const cards = body.cards;
        expect(cards.length).toBe(5);

        cards.forEach((card) => {
          expect(card).toMatchObject({
            pack_id: expect.any(Number),
            username: expect.any(String),
            topic_id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            education_id: expect.any(String),
            visibility: expect.any(Boolean),
            questions: expect.any(Object),
          });
        });
      });
  });
});


describe("GET /api/study_groups",()=>{
  test("200: Responds with an array of objects with Study Group details.",()=>{
    return request(app)
    .get("/api/study_groups")
    .expect(200)
    .then(({body})=>{
      const study_groups = body.study_groups;
      expect(study_groups.length).toBe(5);

      study_groups.forEach((study_group) => {
        expect(study_group).toMatchObject({
          group_id: expect.any(Number),
          subject_id: expect.any(Number),
          study_group: expect.any(String),
          avatar_img_url: expect.any(String),
          created_at: expect.any(String),
        });
      })
      })
  })
})


describe("GET /api/study_groups/:study_group_id",()=>{
  test("200: Responds with a single object with Study Group details for the study_group_id passed.",()=>{
    return request(app)
    .get("/api/study_groups/1")
    .expect(200)
    .then(({body})=>{
      const study_group = body.group;
      expect(study_group.group_id).toBe(1)
      expect(study_group).toMatchObject({
        group_id: expect.any(Number),
        subject_id: expect.any(Number),
        study_group: expect.any(String),
        avatar_img_url: expect.any(String),
        created_at: expect.any(String),
      });
    })
  })

  test("404: Responds with 'Resource Not Found' when given a valid study_group_id that is not in the database", () => {
    return request(app)
      .get("/api/study_groups/233")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource Not Found");
      });
  });

  test("400: Responds with 'Bad request' when given a invalid study_group_id.", () => {
    return request(app)
      .get("/api/study_groups/abc")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

})

describe("POST /api/users",()=>{
  test("201: Responds with a single object with New User details inserted in the database.",()=>{
    //username, name, avatar_img_url, education_id
    const postReq = {
      username:"test", 
      name: "testname",
      avatar_img_url: "https://w0.peakpx.com/wallpaper/301/187/HD-wallpaper-cat-cute.jpg",
      education_id: "one"
    }
    return request(app)
    .post("/api/users")
    .send(postReq)
    .expect(201)
    .then(({body})=>{

      const user = body.user;
      expect(user.username).toBe("test")
      expect(user.name).toBe("testname")
      expect(user.avatar_img_url).toBe("https://w0.peakpx.com/wallpaper/301/187/HD-wallpaper-cat-cute.jpg")
      expect(user.education_id).toBe("one")

      expect(user).toMatchObject({
        username: expect.any(String),
         name: expect.any(String),
         avatar_img_url: expect.any(String),
         education_id: expect.any(String),
         settings: expect.any(Object),
         calendar: expect.any(Object),
         created_at: expect.any(String)
      });
           
    })
  })

  test("400: Responds with 'Bad request' when given a invalid post users request.", () => {
    const postReq = {    
      username: "test", 
      name: "testname",
      avatar_img_url: "https://w0.peakpx.com/wallpaper/301/187/HD-wallpaper-cat-cute.jpg",
      education_id: "school" 
   }

    return request(app)
      .post("/api/users")
      .send(postReq)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Foreign key violation");
      });
  });
})


describe("POST /api/topics",()=>{
  test("201: Responds with a single object with New Topic details inserted in the database.",()=>{
    const postReq = {
      topic_name:"testtopic", 
      education_id: "one",
      subject_id: 1
    }
    return request(app)
    .post("/api/topics")
    .send(postReq)
    .expect(201)
    .then(({body})=>{
      const topic = body.topic
      expect(topic.topic_id).toBe(7)
      expect(topic.topic_name).toBe("testtopic")
      expect(topic.education_id).toBe("one")
      expect(topic.subject_id).toBe(1)

      expect(topic).toMatchObject({
         topic_name: expect.any(String),
         education_id: expect.any(String),
         subject_id: expect.any(Number)
      });           

    })
  })

  test("400: Responds with 'Bad request' when given an invalid post topics request.",()=>{
    const postReq = {
      topic_name:"testtopic", 
      education_id: "home",
      subject_id: 1
    }
    return request(app)
    .post("/api/topics")
    .send(postReq)
    .expect(400)
    .then(({body})=>{
       expect(body.msg).toBe("Foreign key violation");
    })

  })
})

describe("GET /api/scoreboard",()=>{
  test("200: Responds with an array objects with Scoreboard details.",()=>{
    return request(app)
    .get("/api/scoreboard")
    .expect(200)
    .then(({body})=>{
      const scoreboards = body.scoreboard
      expect(scoreboards.length).toBe(9);
      scoreboards.forEach((scoreboard) => {
        expect(scoreboard).toMatchObject({
          score_id: expect.any(Number),
          username: expect.any(String),
          game_id: expect.any(Number),
          topic_id: expect.any(Number),
          subject_id: expect.any(Number),
          score: expect.any(Object),
          created_at: expect.any(String),
        });
      });  

    })
  })
})