const express = require("express");
const morgan = require("morgan");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;
app.use(morgan("dev"));
let products = [];
let id = 0;
function generatePrdt() {
  return {
    id: id++,
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(),
    thumbnail: faker.image.business(),
  };
}

app.get("/api/productos-test", (req, res) => {
  const count = req.query.cant || 5;
  for (let i = 0; i < count; i++) {
  const item = generatePrdt();
  products.push(item);
  }
  res.send(products)

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
