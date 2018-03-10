const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const books = require('./routes/books');



app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});


app.use('/books', books);


app.listen(port, () => console.log(`Listening on port ${port}`));