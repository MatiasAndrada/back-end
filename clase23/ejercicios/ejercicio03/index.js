const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  session({
    secret: "sh",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());
let visitas = 0;

app.get("/", (req, res) => {
  req.session.nombre = "Matias";
  if (!req.session.visitas) {
    req.session.visitas = 1;
    res.send(`bienvenido ${req.query.name}`);
  } else {
    req.session.visitas++;
    res.send(
      `${req.query.nombre} visitaste la pagina ${req.session.visitas} veces`
    );
  }
});

app.get("/logout", (req, res) => {
  if (req.query.name) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ status: "Logout ERROR", body: err });
      } else {
        res.send("Logout ok!");
      }
    });
  } else {
    res.send("No se ha ingresado nombre");
  }
});

app.listen(8080);
