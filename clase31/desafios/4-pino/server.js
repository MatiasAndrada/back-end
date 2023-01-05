const express = require("express");
const pino = require("pino");
const app = express();
const PORT = 8080;

function buildProdLogger() {
  const logger = pino("debug.log");
  logger.level = "debug";
  return logger;
}
function buildDevLogger() {
  const logger = pino();
  logger.level = "info";
  return logger;
}

let logger = process.argv[2] === "PROD" ? buildProdLogger() : buildDevLogger();

app.get("/", (req, res) => {
  logger.info("Se accedió a la ruta /");
  res.send("Bienvenido a la calculadora");
});

app.get("/sumar", (req, res) => {
  const { a, b } = req.query;
  const numA = Number(a);
  const numB = Number(b);
  if (isNaN(numA) || isNaN(numB)) {
    logger.error("Error: uno de los parámetros no es un número");
    res.status(400).send("Error: uno de los parámetros no es un número");
  } else {
    logger.info(`Se sumaron ${numA} y ${numB}`);
    res.send(`La suma de ${numA} y ${numB} es ${numA + numB}`);
  }
});

app.use((req, res) => {
  logger.warn("Recurso no encontrado");
  res.status(404).send("Recurso no encontrado");
});
const server = app.listen(PORT, () => {
  logger.info(`Servidor inicializado en el puerto ${PORT}`);
});

server.on("error", (error) => {
  logger.error(`Error en servidor: ${error}`);
});
