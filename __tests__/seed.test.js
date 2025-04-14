const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeAll(() => seed());
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
          expect(column.column_name).toBe("game_name");
          expect(column.data_type).toBe("character varying");
        });
    });
  });

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
    });
    test("education_level table has education_id column as text", () => {
      return db
        .query(
          `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'education_level'
                    AND column_name = 'education_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("education_id");
          expect(column.data_type).toBe("character varying");
        });
    });
    test("education_level table has description column as text", () => {
      return db
        .query(
          `SELECT *
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
  describe.skip("users table", () => {
    test("users table exists", () => {
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
    });
    test("users table has username column as varchar", () => {
      return db
        .query(
          `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'username';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("username");
          expect(column.data_type).toBe("character varying");
        });
    });
    test("users table has username column as the primary key", () => {
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
          expect(column_name).toBe("username");
        });
    });
    test("users table has name column as varchar", () => {
      return db
        .query(
          `SELECT *
                    FROM information_schema.columns
                    WHERE table_name = 'education_level'
                    AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("character varying");
        });
    });
    test("users table has email column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                          FROM information_schema.columns
                          WHERE table_name = 'users'
                          AND column_name = 'email';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("email");
          expect(column.data_type).toBe("character varying");
        });
    });
    test("users table has avatar_img_url column as text", () => {
      return db
        .query(
          `SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'avatar_img_url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("avatar_img_url");
          expect(column.data_type).toBe("text");
        });
    });
  });
});
