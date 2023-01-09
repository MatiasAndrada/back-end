const express = require("express");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");

const paseArgv = require("minimist")(process.argv.slice(2));
const morgan = require("morgan");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");
const dbConfig = require("./config");
const mongoose = require("mongoose");
const AWS = require('aws-sdk');


AWS.config.update({
  region: 'us-east-1',
})

const app = express();
mongoose.connect(dbConfig.mongodb.cnxStr);
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);

app.set("PORT", paseArgv.p || 8081);
app.engine(
  ".hbs",
  exphbs.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
);
app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", ".hbs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//!LOGGER
const logger = require("./logs/logger");

//!PASSPORT
// Configuring Passport
const passport = require("passport");
const expressSession = require("express-session");
//Initialize Passport
const initPassport = require("./passport/init");
initPassport(passport);
//Use the session middleware
app.use(
  expressSession({
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
const flash = require("connect-flash");
app.use(flash());

//!ROUTES
app.use("/", require("./routes/auth.js")(passport));
app.use("/api", require("./routes/info.js"));
app.use("/api/carrito", require("./routes/carrito.js"));
app.use("/api/productos", require("./routes/productos.js"));

app.use("*", (req, res) => {
  logger.warn("Recurso no encontrado");
  res.status(404).send("Recurso no encontrado");
});

io.on("connection", (socket) => {
  socket.emit("refresh-new-products-cart");
  socket.emit("refresh-new-products");
  socket.on("refresh-products", (IdCart) => {
    io.sockets.emit("refresh-new-products-cart", IdCart);
  });
  socket.on("change-list", () => {
    io.sockets.emit("refresh-new-products");
  });

  socket.on("change-list-cart", (idCart) => {
    io.sockets.emit("refresh-new-products-cart", idCart);
  });
});

//Escuchamos el puerto
const connectedServer = httpServer.listen(app.get("PORT"), () => {
  logger.info(`Servidor http escuchando en el puerto ${app.get("PORT")}`);
});
//por si hay algun error en el servidor
connectedServer.on("error", (error) => {
  logger.error(`Error en servidor ${error}`);
});
