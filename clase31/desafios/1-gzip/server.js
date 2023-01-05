/*
Realizar un servidor con dos endpoints GET, cada uno que devuelva la frase 'Hola que tal' concatenada 1000 veces, en las rutas '/saludo' y '/saludozip'.
Al manejador de '/saludozip' agregar gzip como middleware.
Probar ambos endpoints y verificar en el navegador cuántos bytes llegan como respuesta desde el servidor y qué headers trae la respuesta.
Sabiendo que  1000 veces 12 caracteres de 1 byte c/u equivale a 12000 bytes (~12kb) ese es tamaño de paquete que esperamos recibir. Chequear si es así en cada caso.
*/

const compression = require("compression");
const express = require("express");
const app = express();
const port = 8080;

let frase = "hola que tal Coderhouse";
let fraseConcat = frase.repeat(1000);

app.get("/saludo", (req, res) => {
  res.send(fraseConcat);
});
//level - Nivel de compresion, threshold - A partir de 1 comprimir
app.get("/saludozip", compression({level: 8, threshold: 1}), (req, res) => {
  res.send(fraseConcat);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
