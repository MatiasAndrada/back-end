const express = require("express");
const morgan = require("morgan");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;
app.use(morgan("dev"));
let populares = [];
let id = 0;
function generateUser(cantidad) {
  return {
    id: id++,
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    website: faker.internet.url(),
    image: faker.image.avatar(),
  };
}

app.post("/api/usuarios/popular", (req, res) => {
  const count = req.query.cant || 50;
  for (let i = 0; i < count; i++) {
    const item = generateUser();
    populares.push(item);
  }

  res.send(populares);
});

app.get("/api/usuarios/:id?", (req, res) => {
  const id = req.params.id;
  if (id) {
    const item = populares.find((item) => item.id === parseInt(id));
    res.send(item);
  } else {
    res.send(populares);
  }
});
app.put("/api/usuarios/:id?", (req, res) => {
  const id = req.params.id;
  if (id) {
    const item = populares.find((item) => item.id === parseInt(id));
    res.send(item);
  } else {
    res.send(populares);
  }
});
app.delete("/api/usuarios/:id?", (req, res) => {
  const id = req.params.id;
  if (id) {
    const items = populares.filter((item) => item.id !== parseInt(id));
    populares = [...items];
    res.send("El item fue eliminado");
  } else {
    res.send("error id is required");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
