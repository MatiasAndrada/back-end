/*
El router base '/api/productos' implementará cuatro funcionalidades:
GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
POST: '/' - Para incorporar productos al listado (disponible para administradores)
PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
*/
/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/
const express = require("express");

const router = express.Router();
const { Product } = require("../class/productsClass");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { autorizar } = require("../server");

const ProductClass = new Product();
const listProducts = ProductClass.readProducts();

//ruta sin autenticacion
router.get(":id?", (req, res) => {
  const { id } = req.params;
  if (id) {
    const product = ProductClass.readProducts().find(
      (product) => product.id == id
    );
    if (product) {
      res.send(product);
    } else {
      res.send("Producto no encontrado");
    }
  } else {
    res.send(ProductClass.readProducts()).status(200);
  }
});

router.post("/", autorizar, (req, res) => {
  const { name, description, thumbnail, price } = req.body;
  const id = ProductClass.readProducts().length + 1;
  const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
  const uuid = uuidv4();
  if (name && description && thumbnail && price) {
    let newProduct = {
      id: id,
      timestamp: timestamp,
      name: name,
      description: description,
      thumbnail: thumbnail,
      price: price,
      code: uuid,
      stock: 0,
    };
    listProducts.push(newProduct);
    ProductClass.writeFileSync(listProducts);
    res.status(200).send("Producto creado");
  } else {
    res.status(400).send("Error en los datos");
  }
});
router.put("/:code", autorizar, (req, res) => {
  const { code } = req.params;
  const id = ProductClass.readProducts().length + 1;
  const { name, description, thumbnail, price } = req.body;
  const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
  const uuid = uuidv4();
  const product = {
    id: id,
    timestamp: timestamp,
    name: name,
    description: description,
    thumbnail: thumbnail,
    price: price,
    code: uuid,
    stock: 0,
  };
  ProductClass.updateProducts(code, product);
  res.status(200).send("Producto actualizado");
});

router.delete("/:code?", autorizar, (req, res) => {
  const { code } = req.params;

  const product = listProducts.find((product) => {
    return product.code == code;
  });
  if (code) {
    if (product) {
      ProductClass.deleteProduct(code);
      res.send("Producto eliminado").status(200);
    } else {
      res.send("Producto no encontrado").status(404);
    }
  } else {
    ProductClass.deleteAllProducts();
    res.send("Productos eliminados").status(200);
  }
});

module.exports = router;
