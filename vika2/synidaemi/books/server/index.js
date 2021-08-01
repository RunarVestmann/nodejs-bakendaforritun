const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { Book, Author } = require('./data/db');
const { CastError, ValidationError } = require('mongoose').Error;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find().populate('author').exec();
        res.json(books);
    } catch (error) {
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('author').exec();
        if (!book) return res.status(404).json({ message: `Could not find author with id: ${id}` });
        res.json(book);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Could not find author with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.post('/books', async (req, res) => {
    try {
        const author = await Author.findById(req.body.author).exec();
        if (!author) return res.status(404).json({ message: `Could not find author with id: ${req.body.author}` });
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Could not find author with id: ${req.body.author}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/books/:id', async (req, res) => {
    const authorId = req.body.author;
    if (authorId)
        try {
            const author = await Author.findById(authorId);
            if (!author) return res.status(404).json({ message: `Could not find author with id: ${authorId}` });
        } catch (error) {
            if (error instanceof CastError)
                return res.status(404).json({ message: `Could not find author with id: ${req.body.author}` });
            // TODO: Perhaps send ourselves an e-mail with the error
            // TODO: Log the error to a database
            return res.status(500).json({ message: `Something went wrong` });
        }
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: `Could not find book with id: ${id}` });
        res.json(book);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Could not find book with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id).exec();
        if (!book) return res.status(404).json({ message: `Could not find book with id: ${id}` });
        res.json(book);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Could not find book with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id).exec();
        if (!author) return res.status(404).json({ message: `Could not find author with id: ${id}` });
        res.json(author);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Could not find author with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.get('/authors/:id/books', async (req, res) => {
    const { id } = req.params;
    try {
        const books = await Book.find({ author: id });
        res.json(books);
    } catch (error) {
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.post('/authors', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndUpdate(id, req.body, { new: true }).exec();
        if (!author) return res.status(404).json({ message: `Could not find author with id: ${id}` });
        res.json(author);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Could not find author with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        return res.status(500).json({ message: `Something went wrong` });
    }
});

app.delete('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndDelete(id);
        if (!author) return res.status(404).json({ message: `Could not find author with id: ${id}` });
        Book.deleteMany({ author: id }).exec((error, result) => {
            if (error) {
                // TODO: Perhaps send ourselves an e-mail with the error
                // TODO: Log the error to a database
                console.log(error);
            }
        });
        res.json(author);
    } catch (error) {
        if (err instanceof CastError) return res.status(404).json({ message: `Could not find author with id: ${id}` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        res.status(500).json({ message: `Something went wrong` });
    }
});

app.use((req, res) => res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` }));

app.listen(PORT, () => console.log(`Server has started and is listening on port ${PORT}`));
