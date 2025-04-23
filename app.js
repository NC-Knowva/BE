const cors = require("cors");
const express = require("express");
const app = express();

const { getGames } = require("./controllers/games.controller");
const { getGroupById, getStudyGroups } = require("./controllers/study_groups.controller");
const { getEndpoints } = require("./controllers/api.controller");

const {
  getUsers,
  getUserByUsername,
  getMessagesByUsername,
  getStudyGroupsByUsername,
  postUser,
} = require("./controllers/users.controller");
const {
  invalidPathController,
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./controllers/errors.controller");
const { getSubjects } = require("./controllers/subjects.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getCards } = require("./controllers/cards.controller");

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.get("/api/users/:username", getUserByUsername);

app.get("/api/users/:username/messages", getMessagesByUsername);

app.get("/api/users/:username/study_groups", getStudyGroupsByUsername);

app.get("/api/study_groups", getStudyGroups);

app.get("/api/study_groups/:study_group_id", getGroupById);

app.get("/api/subjects", getSubjects);

app.get("/api/games", getGames);

app.get("/api/topics", getTopics);

app.get("/api/cards", getCards);

app.use(invalidPathController);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;