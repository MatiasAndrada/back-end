/*
1)Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
    a)Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
    b)Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
2)Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
*/
const express = require("express");
const { listProducts } = require("./product_class");
const PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));

app.get("/", (req, res) => {
  res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
});

app.get("/productos", async (req, res) => {
  const products = await listProducts.getAll();
  res.send(`<h1 style="color:blue">Productos disponibles:</h1> <br>
    ${products
      .map((product) => `<li>${product.tipo} ${product.precio}</li>`)
      .join("")}`);
});
app.get("/productoRandom", async (req, res) => {
  const products = await listProducts.getAll();
  const prdtRandom = products[Math.floor(Math.random() * products.length)];
  console.log("🦇 ~ file: index.js ~ line 31 ~ app.get ~ prdtRandom", prdtRandom)
  res.send(`El producto random elegido es: <br>
    <li> ${prdtRandom.tipo} ${prdtRandom.precio} </li> `);
});

//obtiene un producto por id
/* listProducts.getById(1) */

//elimina un producto por id
/* listProducts.deleteById(1); */

//elimina todos los productos
/* listProducts.deleteAll(); */
