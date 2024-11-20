// migrations/2024MMDDHHMMSS_create_token_blacklist_table.js

exports.up = function(knex) {
    return knex.schema.createTable('TokenBlacklist', function(table) {
        table.string('token').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('TokenBlacklist'); 
};
