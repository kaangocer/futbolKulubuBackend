// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',  
    connection: {
      host: '127.0.0.1',  
      user: 'postgres',  
      password: '1203',
      database: 'futbol_kulubu_db', 
       
    },
    migrations: {
      directory: './migrations'  
    },
    seeds: {
      directory: './seeds'  
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'staging_db',
      user: 'staging_user',
      password: 'staging_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'production_db',
      user: 'production_user',
      password: 'production_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
