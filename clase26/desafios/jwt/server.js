const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("./jwt");

//!DB
const users = [];

const app = express();

app.engine(
  ".hbs",
  exphbs.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
);
app.set("view engine", ".hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//!RUTA REGISTER

app.post('/register', (req, res) => {
  const { nombre } = req.body
  const usuario = users.find(usuario => usuario.nombre == nombre)
  if (usuario) {
      return res.status(400).json({ error: 'el nombre de usuario ya existe' });
  }

  const user = req.body
  if (!user.contador) {
      user.contador = 0
  }
  users.push(req.body)
  const access_token = jwt.generateAuthToken(nombre);
  res.json({ access_token });
})
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});
app.get("/register-error", (req, res) => {
  res.render("register-error");
});


//!RUTA LOGIN
app.post("/login", (req, res) => {
  const { nombre, password } = req.body;

  const userExist = users.find((u) => u.nombre == nombre);
  if (!userExist) {
    return res.json({ error: "usuario no registrado" })
  }
  const userOk = users.find(
    (u) => u.nombre == nombre && u.password == password
  );
  if (!userOk) {
    return res.json({ error: "credenciales invalidas" })
  }
  userExist.contador = 0;

  const access_token = jwt.generateAuthToken(nombre);

  res.json({ nombre, access_token });
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
})
app.get("/login-error", (req, res) => {
  res.render("login-error");
})
//!API DATOS
app.get('/api/datos', jwt.auth, (req, res) => {   
  const user = users.find(user => user.nombre == req.user.data)
  console.log(user)
  if (!user) {
      return res.status(404).json({ error: 'usuario no encontrado' });
  }

  user.contador++
  res.json({
      datos: user,
      contador: user.contador
  })
})
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));

