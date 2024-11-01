/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Kullanici', (table) => {
      table.increments('KullaniciId').primary(); // Otomatik artan anahtar
      table.string('Email').unique().notNullable(); // UNIQUE ve boş geçilemez
      table.string('PasswordHash').notNullable(); // Şifre hash'i
      table.string('PasswordSalt').notNullable(); // Şifre salt
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
  