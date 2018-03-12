"use strict";

const bookshelf = require('../db/knex.js');


const Book = bookshelf.Model.extend({
    tableName: 'book'
});

module.exports = bookshelf.model('Book', Book);
