const { Schema } = require('mongoose');

module.exports = new Schema({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
});
