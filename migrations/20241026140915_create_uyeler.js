/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Uyeler", (table) => {
      table.increments("UyeId").primary(); // Otomatik artan ID
      table.integer("KullaniciId").unsigned().references("KullaniciId").inTable("Kullanici"); // Kullanıcılar tablosuyla ilişki
      table.integer("GrupId").unsigned().references("GrupId").inTable("Gruplar"); // Gruplar tablosuyla ilişki
      table.string("TcNo", 11).notNullable().unique(); // 11 haneli TC No, benzersiz
      table.string("Ad").notNullable(); // Ad
      table.string("SoyAd").notNullable(); // Soyad
      table.string("TelNo"); // Telefon numarası
      table.integer("DogumYili"); // Doğum yılı
      table.string("AnneAdi"); // Anne adı
      table.string("BabaAdi"); // Baba adı
      table.string("AnneTelNo"); // Anne telefon numarası
      table.string("BabaTelNo"); // Baba telefon numarası
      table.string("Adres"); // Adres
      table.timestamp("KayitTarihi").defaultTo(knex.fn.now()); // Kayıt tarihi
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Uyeler"); // Geri alma işlemi
  };
  