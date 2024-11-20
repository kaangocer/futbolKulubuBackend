/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Aidat', function(table) {
      table.increments('AidatId').primary(); 
      table.integer('UyeId').unsigned().references('UyeId').inTable('Uyeler').onDelete('CASCADE'); // Üye ID'si
      table.integer('Yil').notNullable(); 
      table.integer('Ay').notNullable(); 
      table.decimal('Miktar', 10, 2).notNullable(); 
      table.string('Durum').notNullable(); 
      table.date('OdemeTarihi'); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Aidat'); 
  };
  