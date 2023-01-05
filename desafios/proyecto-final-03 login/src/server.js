const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");
const  dbConfig = require('./config');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(dbConfig.mongodb.cnxStr);
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);


app.set("PORT", process.env.PORT || 8080);
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
//!PASSPORT
// Configuring Passport
const passport = require('passport');
const expressSession = require('express-session');
//Initialize Passport 
const initPassport = require('./passport/init');
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
const flash = require('connect-flash');
app.use(flash());

//!ROUTES
app.use("/", require("./routes/auth.js")(passport));
app.use("/api/carrito", require("./routes/carrito.js"));
app.use("/api/productos", require("./routes/productos.js"));

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
  console.log(`Server htpp listen in  ${app.get("PORT")} `);
});
//por si hay algun error en el servidor
connectedServer.on("error", (error) => {
  console.log(`Error en servidor ${error}`);
});
