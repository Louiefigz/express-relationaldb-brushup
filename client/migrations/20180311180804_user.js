
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments('id').primary();
        tbl.string('name');
        tbl.string('username').unique();
        tbl.string('email').unique();
        tbl.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
