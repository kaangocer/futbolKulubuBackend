/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("FormaStok", (table) => {
      table.increments("StokId").primary(); // Otomatik artan ID
      table.integer("FormaId").unsigned().references("FormaId").inTable("Formalar"); // Formalar tablosuyla ilişki
      table.integer("ToplamAdet").notNullable(); // Toplam adet
      table.integer("TeslimEdilen").notNullable(); // Teslim edilen
      table.integer("KalanAdet").notNullable(); // Kalan adet
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("FormaStok"); // Geri alma işlemi
  };
  