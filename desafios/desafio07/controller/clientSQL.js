const { json } = require("express");

// creamos el cliente de la base de datos del tipo PostgreSQL
class ClientSQL {
  constructor(tableName, knex) {
    this.tableName = tableName;
    this.knex = knex;
  }
  createTableMessages() {
    this.knex.schema
      .createTable(this.tableName, function (table) {
        table.increments("id").primary();
        table.string("user", 12).notNullable();
        table.string("message", 64).notNullable();
        table.time("date").notNullable();
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  createTableProducts() {
    this.knex.schema.createTable(this.tableName, function (table) {
      table.increments("id").primary();
      table.string("name", 64).notNullable();
      table.integer("price", 64).notNullable();
      table.string("thumbnail").notNullable();
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  insert(data) {
    return this.knex(this.tableName)
      .insert(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  async getAll(...params) {
    return await this.knex.from(this.tableName).select(params);
  }

  getById(id) {
    return this.knex(this.tableName)
      .where({ id: id })
      .then((rows) => console.log(rows));
  }
  update(id, table) {
    return this.knex(tableName).where({ id }).update(table);
  }
  deleteById(id) {
    return this.knex(this.tableName)
      .where({ id })
      .delete()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  deleteAll() {
    return this.knex.schema
      .dropTable(this.tableName)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  deleteTable() {
    return this.knex.schema
      .dropTable(this.tableName)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  close() {
    return this.knex.destroy();
  }
}
module.exports = ClientSQL;
