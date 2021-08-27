const config = require('../../config')

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : config.dbHost,
    user : config.dbUser,
    password : config.dbPassword,
    database : config.dbName,
    port: config.dbPort
  }                
});

module.exports = knex