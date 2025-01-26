/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("Formalar", (table) => {
      table.dropColumn("FormaTipi");
      table.dropColumn("Boyut");
  
      table
        .integer("FormaTipId") // Yeni sütun ekliyoruz
        .unsigned()
        .references("FormaTipId")
        .inTable("FormaTipleri")
        .onDelete("CASCADE")
        .notNullable();
  
      table
        .integer("BoyutId") // Yeni sütun ekliyoruz
        .unsigned()
        .references("BoyutId")
        .inTable("Boyutlar")
        .onDelete("CASCADE")
        .notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.alterTable("Formalar", (table) => {
      table.dropColumn("FormaTipId");
      table.dropColumn("BoyutId");
  
      table.string("FormaTipi").notNullable();
      table.string("Boyut").notNullable();
    });
  };
  