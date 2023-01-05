const express = require("express");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);

app.set("PORT", 8080);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("new-message", (message) => {
    io.sockets.emit("emitSocket", message);
  });
});

//Escuchamos el puerto
const connectedServer = httpServer.listen(app.get("PORT"), () => {
  console.log(`Server htpp listen in  ${app.get("PORT")} `);
});
//por si hay algun error en el servidor
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
