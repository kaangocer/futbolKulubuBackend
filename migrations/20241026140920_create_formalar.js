/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Formalar", (table) => {
      table.increments("FormaId").primary(); // Otomatik artan ID
      table.integer("UyeId").unsigned().references("UyeId").inTable("Uyeler"); // Üyeler tablosuyla ilişki
      table.string("FormaTipi").notNullable(); // Forma tipi
      table.string("FormaDurum").notNullable(); // Forma durumu
      table.timestamp("VerilmeTarihi"); // Verilme tarihi
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Formalar"); // Geri alma işlemi
  };
  