const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe.skip("ALL /notAPath", () => {
  test("404: Responds with 'Invalid URL' when attempting to access a non-existent endpoint", () => {
    return request(app).get("/notAPath")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Invalid URL');
    });
  });
});

describe.skip("GET /api/users", () => {
  test("200: Responds with all users", () => {
    const expectedUser = {
      username: expect.any(String),
      name: expect.any(String),
      password: expect.any(String),
      email: expect.any(String),
      avatar_img_url: expect.any(String),
      education_id: expect.any(String),
      settings: expect.any(Object),
      calendar: expect.any(Object)
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