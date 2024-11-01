/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Gruplar", (table) => {
      table.increments("GrupId").primary(); // Otomatik artan ID
      table.string("GrupAdi").notNullable(); // Grup adı
      table.string("GrupTipi"); // Grup tipi
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Gruplar"); // Geri alma işlemi
  };
  