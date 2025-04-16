const cors = require('cors');
const express = require("express");
const app = express();
const { getUsers } = require("./controllers/users.controller");
const { invalidPathController, psqlErrorHandler, customErrorHandler, serverErrorHandler } = require("./controllers/errors.controller");

app.use(cors());

app.use(express.json());

app.get("/api/users", getUsers);

app.use(invalidPathController);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;