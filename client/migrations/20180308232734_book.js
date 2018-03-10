
exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', (table) => {
        table.increments();
        table.string('title');
        table.string('genre');
        table.text('desc');
        table.string('image_url');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('book');
};
