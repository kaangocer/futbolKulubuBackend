/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Formalar", (table) => {
      table.increments("FormaId").primary(); 
      table.integer("UyeId").unsigned().references("UyeId").inTable("Uyeler"); 
      table.string("FormaTipi").notNullable(); 
      table.string("FormaDurum").notNullable(); 
      table.timestamp("VerilmeTarihi"); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Formalar"); 
  };
  