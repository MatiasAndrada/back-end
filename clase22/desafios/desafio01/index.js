const { normalize, denormalize, schema } = require("normalizr");
const util = require("util");
const data = require("./data.json");

const empleado = new schema.Entity("empleado");
const empresa = new schema.Entity("empresa", {
  gerente: empleado,
  encargado: empleado,
  empleados: [empleado],
});

const data_normalizada = normalize(data, empresa);
console.log(util.inspect(data_normalizada, false, 12, true));
/*util:
○ El primer parámetro es el objeto a inspeccionar.
○ El segundo parámetro muestra todas las propiedades ocultas y no ocultas.
○ El tercer parámetro indica hasta qué profundidad es analizado el objeto.
○ El cuarto parámetro colorea la salida.
*/
