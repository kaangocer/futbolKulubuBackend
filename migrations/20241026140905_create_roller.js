/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Roller", (table) => {
      table.increments("RolId").primary(); 
      table.string("RolAdi").notNullable(); 
      table.string("Yetkiler"); 
      table.string("Aciklama"); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Roller"); 
    
  };
  