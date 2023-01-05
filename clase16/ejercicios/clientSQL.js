import kenexLib from "knex";

// creamos el cliente de la base de datos del tipo PostgreSQL
class ClientSQL {
  constructor(config) {
    this.knex = kenexLib(config);
  }
  createTable(data) {
    return this.knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
      table.string("name", 15).notNullable();
      table.string("code").notNullable();
      table.float("price").notNullable();
      table.integer("stock");
    });
  }
  insert(data) {
    return this.knex("products").insert(data);
  }
  consult() {
    return this.knex.select().from("products");
  }
  consultById(id) {
    return this.knex.select().from("products").where({ id });
  }
  update(id, data) {
    return this.knex("products").where({ id }).update(data);
  }
  delete(id) {
    return this.knex("products").where({ id }).del();
  }

  close() {
    this.knex.destroy();
  }
}
export default ClientSQL;
