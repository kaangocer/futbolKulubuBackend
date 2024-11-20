/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Gruplar", (table) => {
      table.increments("GrupId").primary(); 
      table.string("GrupAdi").notNullable();
      table.string("GrupTipi"); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Gruplar"); 
  };
  