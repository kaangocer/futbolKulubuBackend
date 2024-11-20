/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Uyeler", (table) => {
      table.increments("UyeId").primary(); 
      table.integer("KullaniciId").unsigned().references("KullaniciId").inTable("Kullanici"); 
      table.integer("GrupId").unsigned().references("GrupId").inTable("Gruplar"); 
      table.string("TcNo", 11).notNullable().unique(); 
      table.string("Ad").notNullable(); 
      table.string("SoyAd").notNullable(); 
      table.string("TelNo"); 
      table.integer("DogumYili"); 
      table.string("AnneAdi"); 
      table.string("BabaAdi"); 
      table.string("AnneTelNo"); 
      table.string("BabaTelNo"); 
      table.string("Adres"); 
      table.timestamp("KayitTarihi").defaultTo(knex.fn.now()); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Uyeler"); 
  };
  