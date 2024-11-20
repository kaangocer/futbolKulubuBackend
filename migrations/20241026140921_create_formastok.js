/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("FormaStok", (table) => {
      table.increments("StokId").primary(); 
      table.integer("FormaId").unsigned().references("FormaId").inTable("Formalar"); 
      table.integer("ToplamAdet").notNullable(); 
      table.integer("TeslimEdilen").notNullable(); 
      table.integer("KalanAdet").notNullable(); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("FormaStok"); 
  };
  