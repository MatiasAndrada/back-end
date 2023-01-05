/*
Crear un proyecto de servidor http en node.js que utilice la dependencia express, escuche en el puerto 8080 y tenga tres rutas get configuradas:
A) '/' en esta ruta raíz, el servidor enviará string con un elemento de título nivel 1 (un h1 en formato HTML) que contenga el mensaje: 'Bienvenidos al servidor express' en color azul.
B) '/visitas' donde con cada request, el servidor devolverá un mensaje con la cantidad de visitas que se hayan realizado a este endpoint. Por ej. 'La cantidad de visitas es 10'
C) '/fyh' donde se devolverá la fecha y hora actual en formato objeto: 
{ fyh: '11/1/2021 11:36:04' }

Mostrar por consola el puerto de escucha del servidor al momento de realizar el listen. En caso de error, representar el detalle.
*/

const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
app.get('/', (req, res)=> {
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
})
let visitas = 0;
app.get('/visitas', (req, res)=> {
    visitas++;
    res.send(`La cantidad de visitas es ${visitas}`); 
})
app.get('/fyh', (req, res)=> {
    const date =  new Date();
    res.send(`La fecha actual es ${date}`);
    
})
const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto: " + PORT);
});
















/* const express = require('express');
const PORT = 8080;

let visitas = 0;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.use((req, res, next) => {
    if (req.url === '/visitas') {
        visitas++;
    }
    next();
})

app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos al servidor express!</h1>');
});

app.get('/visitas', (req, res) => {
    res.send(`La cantidad de visitas es: ${visitas}`);
});

app.get('/fyh', (req, res) => {
    const fecha = new Date();
    const dateString = fecha.getDay() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    res.send({ fyh: `${dateString}` });
}); */
