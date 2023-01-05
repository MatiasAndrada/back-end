/*
Crear un servidor que tenga una ruta '/sumar' que reciba por query params dos números y devuelva un mensajes con la suma entre ambos.
Utilizar log4js para crear un módulo capaz de exportar uno de los siguientes dos loggers: uno para el entorno de desarrollo, que logueará de info en adelante por consola, y otro para el entorno de producción, que logueará de debug en adelante a un archivo ‘debug.log’ y solo errores a otro archivo ‘errores.log’.
El logueo se realizará siguiendo el siguiente criterio:
En caso de operaciones exitosas, loguear una línea de info
En caso de ingresar un número no válido, loguear un error
En caso de fallar el inicio del servidor, loguear un error
En caso de recibir una petición a un recurso inválido, loguear una warning.
La decisión de qué logger exportar se tomará en base al valor pasado por argv cuyo valor puede ser: ‘PROD’ para producción, o cualquier otra cosa (incluyendo nada) para desarrollo.

*/

const express = require("express");
const app = express();
const PORT = 8080;

const winston = require("winston");

function buildProdLogger() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: "errores.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "debug.log",
        level: "debug",
      }),
    ],
  });
  return logger;
}
function buildDevLogger() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
      }),
    ],
  });
  return logger;
}

const logger =
  process.argv[2] === "PROD" ? buildProdLogger() : buildDevLogger();

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
