const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bookServices = require('../services/books');


var router = express.Router();



/* GET home page. */
router.get('/', bookServices.getBooks);

/* INSERT new book. */
router.post('/new',jsonParser, bookServices.postBook);

/* EDIT book. */
router.put('/edit/:id', jsonParser, bookServices.editBook);


/* DELETE book. */
router.delete('/delete/:id', bookServices.deleteBook);


module.exports = router;