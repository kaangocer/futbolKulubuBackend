exports.up = function(knex) {
    return knex.schema.table('FormaStok', function(table) {
      table.dropColumn('FormaId'); // FormaId sütununu kaldırıyoruz
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('FormaStok', function(table) {
      table.integer('FormaId').notNullable(); // Eğer geri alırsak, FormaId'yi tekrar ekliyoruz
    });
  };
  