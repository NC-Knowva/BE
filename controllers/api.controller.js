const endpoints = require("../endpoints.json");

module.getEndpoints = (request, response) => {
  response.status(200).send({ endpoints: endpoints });
};
