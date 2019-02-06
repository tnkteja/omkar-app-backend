var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'maria',
      database : 'omkar'
    }
  });

  const setupPaginator = require('knex-paginator');
setupPaginator(knex);

  module.exports = {knex}