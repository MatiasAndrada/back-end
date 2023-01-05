/*
Node built-in profiler

La mayoría de las veces, es más fácil usar el profiler que ya tiene Node, en lugar de usar otra herramienta para esto.
Para empezar a usar este profiler, primero creamos una pequeña aplicación en Express con un servidor y algunas rutas.
Configuramos el archivo server.js como sigue:

*/

const express = require("express");
const crypto = require("crypto");

const app = express();

const users = {};

app.use(express.static("public"));


//Con la ruta /getUsers se muestra el listado de usuarios registrados.
//Con la ruta /newUser se registra un nuevo usuario.
//Se utiliza el módulo crypto para encriptar las contraseñas.

app.get("/getUsers", (req, res) => {
  res.json({ users });
});

app.get("/newUser", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString("base64");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

  users[username] = { salt, hash };

  res.sendStatus(200);
});

/*
*auth-bloq
La ruta /auth-bloq realiza el login del usuario.
En este caso, el proceso por el cual se realizar el login es sincrónico, por lo tanto es un proceso bloqueante.

 */

app.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
  
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      process.exit(1)
      // res.sendStatus(401);
    }
  });
  /*
*auth-nobloq
La ruta /auth-nobloq también realiza el login del usuario.
En este caso, el proceso por el cual se realizar el login es asincrónico, por lo tanto es un proceso NO bloqueante.

 */
app.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        process.exit(1)
        //res.sendStatus(401);
      }
    });
  });


const PORT = parseInt(process.argv[2]) || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));

