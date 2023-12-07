const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepository);
  
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs } = request.body;
  const findIndex = repositories.findIndex((findRepository) => findRepository.id === id);

  if (findIndex === -1) return response.status(400).send();

  repositories[findIndex].title = title;
  repositories[findIndex].url = url;
  repositories[findIndex].techs = techs;

  return response.json(repositories[findIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const findIndex = repositories.findIndex((findRepository) => findRepository.id === id);

  if (findIndex === -1) return response.status(400).send();

  repositories.splice(findIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;
  const findIndex = repositories.findIndex((findRepository) => findRepository.id === id);

  if (findIndex === -1) return response.status(400).send();

  repositories[findIndex].likes++;

  return response.json(repositories[findIndex]);
});

module.exports = app;
