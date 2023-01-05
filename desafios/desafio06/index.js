const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
app.set("PORT", 8080);

const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);
app.engine("handlebars", engine());
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const products = [];
const messages = [];

io.on("connection", (socket) => {
  socket.emit("new-chat-message", messages);
  socket.on("new-message", (message) => {
    messages.push(message);

    io.sockets.emit("new-chat-message", messages);
  });
  socket.on("new-product", (product) => {
    products.push(product);

    io.sockets.emit("new-product", products);
  }
  );
});

//Escuchamos el puerto
const connectedServer = httpServer.listen(app.get("PORT"), () => {
  console.log(`Server htpp listen in  ${app.get("PORT")} `);
});
//por si hay algun error en el servidor
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
