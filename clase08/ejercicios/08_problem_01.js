/*
- Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
    GET: devolverá la lista requerida en formato objeto.
POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
Persona -> { "nombre": ..., "apellido": ..., "edad":... }
Mascota -> { "nombre":..., "raza":..., "edad":... }
- Utilizar el Router de express para definir las rutas base, implementando las subrutas en los métodos correspondientes.
- Probar la funcionalidad con Postman.
- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.
*/

const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("PORT", 3000);

const personas = [];
const mascotas = [];

const router_personas = express.Router();
const router_mascotas = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//El urlencoded es para que se pueda interpretar los datos en formato json

/* function dataValidate (req, res, next) {
    console.log(req.body, "isOkey");

  next();
};
app.use(dataValidate); */

app.use("/personas", router_personas);
app.use("/mascotas", router_mascotas);

router_personas.get("", (req, res) => {
    
    personas.forEach((persona) => {
        res.send(`${persona.nombre} ${persona.apellido} ${persona.edad}`);
    });
    
});

router_personas.post("", (req, res) => {
console.log(req.body)
  personas.push(req.body);
  res.send("Persona agregada");
});


router_mascotas.get("", (req, res) => {

  res.send(mascotas);
});

router_mascotas.post("", (req, res) => {
  const { nombre, raza, edad } = req.body;
  if (!nombre || !raza || !edad) {
    res.statusCode(400).send("Faltan datos");
  } else {
    personas.push({ nombre, raza, edad });
    res.status(200).json({ nombre, raza, edad });
  }
});

const server = app
  .listen(app.get("PORT"), () => {
    console.log(
      `Servidor HTTP escuchando en el puerto ${server.address().port}`
    );
  })
  .on("error", (err) => {
    console.log(err);
  });
