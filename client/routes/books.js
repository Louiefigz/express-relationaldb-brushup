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
        .then((data) => {
        res.send(data)
    })
        .catch(error => console.log('iS there an error', error) )
});

module.exports = router;