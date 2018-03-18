const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//const User = require('./models/user');
const book = require('./routes/books');
const users = require('./routes/users');



app.use('/books', book);
app.use('/users', users)

// app.get('/books',  (req, res) => {
//
//     Book
//         .collection()
//         .fetch()
//         .then((posts) => {
//             res.send(posts);
//         })
//         .catch((error) => {
//             res.send({error});
//         });
// });


app.listen(port, () => console.log(`Listening on port ${port}`));