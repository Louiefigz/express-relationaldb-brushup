const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const knex = require('../db/knex');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    knex('book').select().then((books) => {
        res.send(books);
    });

});

/* INSERT new book. */
router.post('/new',jsonParser, (req, res) => {
    console.log(req.body)
    knex('book')
        .insert(req.body)
        .returning('*')
        .then((data) => res.send(data))
        .catch(error => console.log('iS there an error', error) )
});

/* EDIT book. */
router.put('/edit/:id', jsonParser, (req, res) => {
    console.log('Body', req.body)
    console.log('Params', req.params.id)

    knex('book')
        .update(req.body)
        .returning('*')
        .where({
            id: req.params.id,
        })
        .then((data) => {
            res.send(data);
        });
});


module.exports = router;