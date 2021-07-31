const { Schema } = require('mongoose');

module.exports = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
    image: { type: String, required: true },
});
