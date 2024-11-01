/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Yoklama", (table) => {
      table.increments("YoklamaId").primary(); // Otomatik artan ID
      table.integer("UyeId").unsigned().references("UyeId").inTable("Uyeler"); // Üyeler tablosuyla ilişki
      table.date("Tarih").notNullable(); // Yoklama tarihi
      table.string("YoklamaDurum"); // Yoklama durumu
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Yoklama"); // Geri alma işlemi
  };
  