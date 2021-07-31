const mongoose = require('mongoose');
const authorSchema = require('../schemas/author');
const bookSchema = require('../schemas/book');

const password = process.env.PASSWORD;

const connection = mongoose.createConnection(
    `mongodb+srv://admin:${password}@books.wenzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

module.exports = {
    Author: connection.model('Author', authorSchema),
    Book: connection.model('Book', bookSchema),
};
