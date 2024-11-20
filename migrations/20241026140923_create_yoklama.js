/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Yoklama", (table) => {
      table.increments("YoklamaId").primary(); 
      table.integer("UyeId").unsigned().references("UyeId").inTable("Uyeler"); 
      table.date("Tarih").notNullable(); 
      table.string("YoklamaDurum"); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Yoklama");
  };
  