/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Aidat', function(table) {
      table.increments('AidatId').primary(); // Otomatik artan ID
      table.integer('UyeId').unsigned().references('UyeId').inTable('Uyeler').onDelete('CASCADE'); // Üye ID'si
      table.integer('Yil').notNullable(); // Yıl
      table.integer('Ay').notNullable(); // Ay
      table.decimal('Miktar', 10, 2).notNullable(); // Miktar
      table.string('Durum').notNullable(); // Durum
      table.date('OdemeTarihi'); // Ödeme tarihi
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Aidat'); // Tablonun silinmesi
  };
  