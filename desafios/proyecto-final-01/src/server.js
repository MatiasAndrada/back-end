const express = require("express");
const morgan = require("morgan");

const { User } = require("./class/userClass");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);

const userClass = new User();

app.set("PORT", process.env.PORT || 8080);

app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

let userState = false;
export function autorizar(req, res, next) {
  if (userState || req.headers.authorization) {
    console.log("AUTHORIZED ACCESS");
    next();
  }else {
    console.log("UNAUTHORIZED ACCESS");
    io.sockets.emit("unauthorized-access");
    res.status(403).send("Ruta no autorizada");
  }
}
app.use("/api/productos", require("./routes/productos.js"));
app.use("/api/carrito", require("./routes/carrito.js"));

io.on("connection", (socket) => {
  socket.emit("refresh-new-products");
  socket.on("sign-up", (user) => {
    userClass.signUp(user);
  });
  socket.on("sign-in", (user) => {
    const signIn = userClass.signIn(user);
    if (signIn) {
      io.sockets.emit("refresh-new-products-cart");
      userState = true;
    }
  });
  socket.on("change-list", () => {
    io.sockets.emit("refresh-new-products");
  });

  socket.on("change-list-cart", () => {
    io.sockets.emit("refresh-new-products-cart");
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
