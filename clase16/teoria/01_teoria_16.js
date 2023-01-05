/*
Kenex es un ORM que nos permite trabajar con bases de datos de forma sencilla, Un ORM es un Object Relational Mapping, es decir, un mapeo de objetos relacionales, que nos permite trabajar con bases de datos de forma sencilla, sin tener que escribir código SQL.

Para instalarlo, debemos ejecutar el siguiente comando en la consola:
NPM INSTALL KENEX


Es importante saber el mecanismo de accion para la  proteccion de los datos:
Las migraciones son archivos que nos permiten crear tablas en la base de datos, y modificarlas en el futuro, si es necesario. Para crear una migracion, debemos ejecutar el siguiente comando en la consola:
NPM RUN KNEX MIGRATE:MAKE NOMBRE_MIGRACION
Los seeders son archivos que nos permiten insertar datos en la base de datos, para que tengamos datos de prueba. Para crear un seeder, debemos ejecutar el siguiente comando en la consola:
NPM RUN KNEX SEED:MAKE NOMBRE_SEEDER

sq3lite es una base de datos que se guarda en un archivo, y no necesita un servidor para funcionar. Para instalarla, debemos ejecutar el siguiente comando en la consola:
NPM INSTALL SQLITE3
En las options  de knex le pasamos 
const options = {
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
    useNullAsDefault: true,
};


*/