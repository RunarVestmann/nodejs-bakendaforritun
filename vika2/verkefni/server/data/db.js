const mongoose = require('mongoose');
const itemSchema = require('../schemas/item');

const password = process.env.DB_PASSWORD;

const connection = mongoose.createConnection(
    `mongodb+srv://admin:${password}@items.qmddv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

module.exports = {
    Item: connection.model('Item', itemSchema),
};
