"use strict";

const bookshelf = require('../db/knex.js');


const User = bookshelf.Model.extend({
    tableName: 'users',
    initialize: function() {
        this.on('creating', this.encryptPassword);
        this.on('destroying', this.destroyAllAttached);
    },
    hasTimestamps: true

});

module.exports = bookshelf.model('User', User);
