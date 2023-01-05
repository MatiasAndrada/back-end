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

// GET '/' -> formulario para agregar prductos.
router.get("/", (req, res) => {
    res.render("pages/index", {
      itemCount: listProducts.length.toString(),
    });
});
router.get("/productos", (req, res) => {
    res.render("pages/products", {
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



module.exports = listProducts;
module.exports = router;

