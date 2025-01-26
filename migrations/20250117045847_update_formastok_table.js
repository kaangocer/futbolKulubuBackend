/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('FormaStok', (table) => {
      // Yeni sütunlar ekleme
      table.integer('FormaTipId').unsigned().references('FormaTipId').inTable('FormaTipleri').onDelete('CASCADE');
      table.integer('BoyutId').unsigned().references('BoyutId').inTable('Boyutlar').onDelete('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.table('FormaStok', (table) => {
      // Yeni sütunları geri al
      table.dropColumn('FormaTipId');
      table.dropColumn('BoyutId');
  
      // Eski sütunları geri ekle
      table.string('FormaTipi').notNullable();
      table.string('Boyut').notNullable();
    });
  };
  