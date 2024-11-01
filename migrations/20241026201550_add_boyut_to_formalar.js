/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("Formalar", (table) => {
      table.string("Boyut").notNullable(); // Forma boyutu
    });
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable("Formalar", (table) => {
      table.dropColumn("Boyut"); // Boyut sütununu kaldır
    });
  };
