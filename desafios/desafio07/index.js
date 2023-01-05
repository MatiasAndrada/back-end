const express = require("express");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const ClientSQL = require("./controller/clientSQL");
const config = require("./config");
const app = express();
app.set("PORT", 8080);
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//mensajes en base sqlite3

const sqlite = new ClientSQL("mensajes", config.knexD);

//sqlite.createTableMessages()
//sqlite.deleteTable()

//productos en base mariaDB

const mariaDB = new ClientSQL("productos", config.knexP);

//mariaDB.createTableProducts()
//mariaDB.deleteTable()

io.on("connection", (socket) => {
  sqlite.getAll("user", "message", "date").then((response) => {
    socket.emit("new-chat-message", response);
  });
  mariaDB.getAll("name", "price", "thumbnail").then((response) => {
    socket.emit("new-product", response);
  });

  socket.on("new-message", (data) => {
    const objMessage = {
      user: data.user,
      message: data.message,
      date: data.date,
    };
    sqlite.insert(objMessage);
    sqlite.getAll("user", "message", "date").then((response) => {
      io.sockets.emit("new-chat-message", response);
    });
  });
  socket.on("new-product", (data) => {
    const objProduct = {
      name: data.name,
      price: data.price,
      thumbnail: data.thumbnail,
    };
    mariaDB.insert(objProduct);
    mariaDB.getAll("name", "price", "thumbnail").then((response) => {
      io.sockets.emit("new-product"), response;
    });
  });
});

//Escuchamos el puerto
const connectedServer = server.listen(app.get("PORT"), () => {
  console.log(`Server htpp listen in  ${app.get("PORT")} `);
});
//por si hay algun error en el servidor
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
