/*
Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
vas a ejectuar un fetch como hicimos anteriormente, o simpelemente usar, un .render de una nueva versiona de la lista solo con la info que vos queres mostrar

*/
const express = require("express");
const router = express.Router();

const listProducts = [];
console.log("🦇listProducts", listProducts);

// GET '/api' -> devuelve todos los productos.
router.get("/", (req, res) => {
  res.send(listProducts);
});

// GET '/api/:id' -> devuelve un producto según su id.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = listProducts.find((p) => p.id == id);
  console.log("🦇 product", product)
  if (product) {
    return res.status(200).send( `Producto encontrado ${product.name} ${product.price}`);
  } else {
    return res.status(404).send("Producto no encontrado");
  }
});

// POST '/api' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const id = listProducts.length + 1;
  const product = { name, price, id };
  listProducts.push(product);
  res.status(200).send(product);
});

// PUT '/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", (req, res) => {
  console.log("0");
  const { id } = req.params;
  console.log("🦇 id", id);
  const product = listProducts.find((p) => p.id == id);
  const { name, price } = req.body;
  console.log("🦇  listProducts", listProducts);
  console.log("🦇 product", product);
  if (product) {
    product.name = name;
    product.price = price;
    return res.status(200).send(`producto actualizado ${product.name} + ${product.price}`);
  } else {
    return res.status(404).send("Producto no encontrado");
  }
});

module.exports = router;
