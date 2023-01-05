import ClientSQL from "./clientSQL.js";
// OP sobre DB utilizando node y kenex
// 1. Crear una tabla
// 2. Insertar datos
// 3. Consultar datos
// 4. Actualizar datos
// 5. Eliminar datos
// 6. Cerrar la conexión

// enviarle las opciones de conexión al cliente
const options = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "knexdb",
  },
};
// creamos el cliente de la base de datos del tipo PostgreSQL
const client = new ClientSQL(options);
// creamos la tabla
client
  .createTable()
  .then(() => {
    //realizar acciones sobre la tabla
    console.log("tabla creada");
    const articulos = [
      { name: "manzana", code: "A01", price: 100, stock: 100 },
      { name: "pera", code: "A02", price: 200, stock: 200 },
      { name: "banana", code: "A03", price: 300, stock: 300 },
      { name: "naranja", code: "A04", price: 400, stock: 400 },
    ];
    // insertar datos
    client.insert(articulos).then(() => {
      console.log("datos insertados");
      // consultar datos
      client.consult().then((data) => {
        console.log("datos consultados");
        console.log(data);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
// cosultar por id
client.consultById(1).then((data) => {
  console.log("datos consultados por id");
  console.log(data);
});

// update product
client
  .update(1, { name: "manzana01", code: "A01", price: 150, stock: 80 })
  .then(() => {
    console.log("datos actualizados");
    // consultar datos
    client.consult().then((data) => {
      console.log("datos consultados");
      console.log(data);
    });
  });

// delete product
client.delete(1).then(() => {
  console.log("datos eliminados");
  // consultar datos
  client.consult().then((data) => {
    console.log("datos consultados");
    console.log(data);
  });
});
// close connection
/* client.close(); */
