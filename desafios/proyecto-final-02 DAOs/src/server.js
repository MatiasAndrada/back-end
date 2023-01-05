const express = require("express");
const morgan = require("morgan");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);

app.set("PORT", process.env.PORT || 8080);

app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

let userState = true;
export function autorizar(req, res, next) {
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
app.use("/api/carrito", require("./routes/carrito.js"));
app.use("/api/productos", require("./routes/productos.js"));

io.on("connection", (socket) => {
  socket.emit("refresh-new-products-cart");
  socket.emit("refresh-new-products");
  socket.on("sign-in", (IdCart) => {
    ;
    io.sockets.emit("refresh-new-products-cart", IdCart);
    userState = true;
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
