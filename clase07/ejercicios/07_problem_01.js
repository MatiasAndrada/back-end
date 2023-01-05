/* 
1) '/api/frase' -> devuelve la frase en formas completa en un campo 'frase
2) '/api/frase/:num' -> devuelve por ordenla letra dentro de esa frase (num 1 refiere a la primera letra), en un campo 'letra')
3)'/api/palabras/:num -> devuelve por orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo 'palabra')
*/

const express = require("express");
const PORT = 8080;
const frase = "Hola mundo como estan";

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));
app.get("/api/frase", (req, res) => {
  res.send(frase);
/*   const data = req.query
  if(!data.name) {
    res.sendStatus(400).send('debes enviar un nombre')
}
  res.send(data) */
});
app.get("/api/frase/:num", (req, res) => {
  let posicion = parseInt(req.params.num);
  res.send(
    "La posicion " + posicion + " de la frase es " + frase.charAt(posicion - 1)
  );
  //chartAt devuelve la letra en la posicion indicada
});
app.get("/api/palabras/:num", (req, res) => {
  let posicion = parseInt(req.params.num);
  if (!isNaN(posicion)) {
  }
  let arr = frase.split(" ");
  res.send(arr[posicion]);
  //split devuelve un array con las palabras de la frase
});
