const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("ALL /notAPath", () => {
  test("404: Responds with 'Invalid URL' when attempting to access a non-existent endpoint", () => {
    return request(app).get("/notAPath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid URL');
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
    }

    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(10);
        users.forEach(user => {
          expect(user).toMatchObject(expectedUser);
        })
      })
  });
});

describe("GET /api/users/:username", () => {
  test("200: Responds with a user with given username", () => {
    const expectedUser = {
      username: "aclaricoats0",
      name: "Addia Claricoats",
      avatar_img_url: "https://robohash.org/verodoloremfuga.png?size=50x50&set=set1",
      education_id: "1",
      settings: expect.any(Object),
      calendar: expect.any(Object),
      created_at: expect.any(String),
    }

    return request(app)
      .get("/api/users/aclaricoats0")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject(expectedUser);
      })
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

describe("GET /api/users/:username/messages", () => {
  test("200: Responds with an array of messages for the given username, sorted by most recent first", () => {

    const expectedMessage = {
      sender_username: expect.any(String),
      receiver_username: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
    }

    return request(app)
      .get("/api/users/eforgan9/messages")
      .expect(200)
      .then(({ body: { messages } }) => {
        expect(messages.length).toBe(5);
        expect(messages).toBeSortedBy('created_at', { descending: true });
        messages.forEach(message => {
          expect(message).toMatchObject(expectedMessage);
        });
      })
  });

  test("200: Responds with an empty array when a user has no messages", () => {
    return request(app)
    .get("/api/users/ktrevaskiss6/messages")
    .expect(200)
    .then(({ body: { messages }}) => {
      expect(messages.length).toBe(0);
      expect(messages).toEqual([]);
    });
  });
});