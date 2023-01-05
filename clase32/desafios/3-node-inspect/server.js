/*
*Análisis de performance con Profiler
Realizar un servidor que calcule 10000 números aleatorios entre el 0 y el 9 inclusive.
El servidor devolverá los números calculados en un array dentro de un objeto en formato JSON: {randoms: [array de randoms]}.
Se van a utilizar dos rutas en las que el cliente puede requerir la información: '/randoms-nodebug' y '/randoms-debug', la última contendrá un console.log que enviará el array calculado a la consola del servidor.
Realizar un servidor que calcule 10000 números aleatorios entre el 0 y el 9 inclusive.
El servidor devolverá los números calculados en un array dentro de un objeto en formato JSON: {randoms: [array de randoms]}.
Se van a utilizar dos rutas en las que el cliente puede requerir la información: '/randoms-nodebug' y '/randoms-debug', la última contendrá un console.log que enviará el array calculado a la consola del servidor.



*/

const express = require("express");
const app = express();
const port = 8080;

app.get("/randoms-nodebug", (req, res) => {
  const randoms = [];
  for (let i = 0; i < 10000; i++) {
    randoms.push(Math.floor(Math.random() * 10));
  }
  res.json({ randoms });
});

app.get("/randoms-debug", (req, res) => {
  const randoms = [];
  for (let i = 0; i < 10000; i++) {
    randoms.push(Math.floor(Math.random() * 10));
  }
  console.log(randoms);
  res.json({ randoms });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
