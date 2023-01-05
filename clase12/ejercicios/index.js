const express = require("express");
const moment = require("moment");
const { Server: HtppServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HtppServer(app);
const io = new IOServer(httpServer);

app.set("PORT", 8080);

app.use(express.static("public"));
const messages = [];

io.on("connection", (socket) => {
  socket.emit("new-chat-message", messages);
  socket.on("new-message", (message) => {
    messages.push(message);
    io.sockets.emit("new-chat-message", messages);
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
