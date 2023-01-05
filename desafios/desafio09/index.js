const express = require("express");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const prdtList = require("./dataDefault/prdt.json");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.set("PORT", 8080);
app.set("view engine", "handlebars");
app.set("views", "./views");
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(
  sessions({
    secret: "shh",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Pichulitoo7:Pichu2909@cluster0.rfxozjp.mongodb.net/test",
      ttl:  60 * 60,
      autoRemove: "disabled",
      touchAfter: 3,

      mongoOptions: advancedOptions,
    }),
  })
);
let session;
let userState = true;

//AHcerlo con sessionStorage
function autorizar(req, res, next) {
  console.log(req.headers.authorization);
  if (userState || req.headers.authorization) {
    console.log("AUTHORIZED ACCESS");
    next();
  } else {
    console.log("UNAUTHORIZED ACCESS");
    io.sockets.emit("unauthorized-access");
    res.status(403).send("Ruta no autorizada");
  }
}

app.get("/login/:user", (req, res) => {
  req.session.user = req.params.user;
  req.session.rol = "Admin";
  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
  res.send({
    usuario: req.session.user,
    rol: req.session.rol,
    visitas: req.session.visitas,
  });
  res.status(200);
});
app.get("/logOut", autorizar, (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
});
app.get("/allProducts", (req, res) => {
  res.json(prdtList).status(200);
});

app.listen(app.get("PORT"), () => {
  console.log(`Servidor express escuchando en el puerto ${app.get("PORT")}`);
});
