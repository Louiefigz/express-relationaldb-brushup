const environment = process.env.NODE_ENV || 'development';
// const config = require('../knexfile')[environment];
// const knex = require('knex')(config);
//
// module.exports = knex;




const config  = require('../knexfile.js');
const knex = require('knex')(config[environment]);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
