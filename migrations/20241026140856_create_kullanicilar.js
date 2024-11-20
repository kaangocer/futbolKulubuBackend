/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Kullanici', (table) => {
      table.increments('KullaniciId').primary(); 
      table.string('Email').unique().notNullable(); 
      table.string('PasswordHash').notNullable(); 
      table.string('PasswordSalt').notNullable(); 
      table.integer('RolId').unsigned().references('RolId').inTable('Roller').onDelete('CASCADE'); // Yabancı anahtar
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Kullanici');
  };
  