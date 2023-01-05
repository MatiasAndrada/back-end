/*
>> Consigna:  
Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
A)Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
b)Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
C)Ambas páginas contarán con un botón que redirija a la otra.
*/
const express = require("express");
const router = express.Router();


const listProducts = [];
console.log("🦇 listProducts", listProducts)

// GET '/' -> formulario para agregar prductos.
router.get("/", (req, res) => {
    res.render("inputProduct", {
      itemCount: listProducts.length.toString(),
    });
});
router.get("/productos", (req, res) => {
    res.render("products", {
        listProducts: listProducts,
        listExist: true,
    });
});

// POST '/' -> agregar producto.
router.post("/", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const id = listProducts.length + 1;
    const product = { name: name, price: price, thumbnail: thumbnail, id: id };
    if (product.name && product.price && product.thumbnail) {
        listProducts.push(product);
        res.redirect("/productos");
    } else {
        res.status(400).send("Error en el producto");
    }
});


// DELETE '/:id' -> elimina un producto según su id.
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const product = listProducts.findIndex((p) => p.id == id);
  console.log(" product", product)
  if (product) {
    listProducts.splice(product, 1);
    return res.status(200).send("Producto eliminado");
  } else {
    return res.status(404).send("Producto no encontrado");
  }
});
module.exports = listProducts;
module.exports = router;

