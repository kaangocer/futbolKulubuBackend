/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Roller", (table) => {
      table.increments("RolId").primary(); // Otomatik artan ID
      table.string("RolAdi").notNullable(); // Rol adı
      table.string("Yetkiler"); 
      table.string("Aciklama"); // Açıklama
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Roller"); // Geri alma işlemi
  };
  