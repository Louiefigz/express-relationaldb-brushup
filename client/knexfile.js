
module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/habitsphereproject',
    },

    production: {
        client: 'pg',
        connection: `postgres://localhost/habitsphereproject`,
    },
};
