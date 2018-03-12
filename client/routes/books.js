const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Book = require('../models/book');


const knex = require('../db/knex');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    Book
        .collection()
        .fetch()
        .then((posts) => {
            res.send(posts);
        })
        .catch((error) => {
            res.send({error});
        });

});

/* INSERT new book. */
router.post('/new',jsonParser, (req, res) => {

    console.log(req.body)
    Book
        .forge(req.body)
        .save()
        .then((book) => {
            res.send(book);
        })
        .catch((error) => {
            res.send({error});
        });
});

/* EDIT book. */
router.put('/edit/:id', jsonParser, (req, res) => {

    Book
        .forge({id: req.params.id})
        .fetch({require: true})
        .then((book) => {
            book.save(req.body)
                .then( saved =>  res.send(saved) )
        })
        .catch((error) => {
            res.send({error});
        });

});


/* DELETE book. */
router.delete('/delete/:id', (req, res) => {


    Book
        .forge({id: req.params.id})
        .fetch({require: true})
        .then(function (book) {
            console.log(book)
            book.destroy()
                .then(function () {
                    res.send( {message: 'User successfully deleted'});
                })
                .catch(function (err) {
                    res.status(500).json({error: true, data: {message: err.message}});
                });
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });

});


module.exports = router;