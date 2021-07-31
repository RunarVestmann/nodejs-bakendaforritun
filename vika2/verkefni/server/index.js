const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { Item } = require('./data/db');
const { CastError, ValidationError } = require('mongoose').Error;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        res.json(item);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        else res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findByIdAndUpdate(id, req.body, { new: true }).exec();
        if (!item) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        res.json(item);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        res.status(500).json({ message: `Something went wrong` });
    }
});

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findByIdAndDelete(id).exec();
        if (!item) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        res.json(item);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Item with id: ${id} was not found` });
        // TODO: Perhaps send ourselves an e-mail with the error
        // TODO: Log the error to a database
        res.status(500).json({ message: `Something went wrong` });
    }
});

app.use((req, res) => res.json({ message: `Resource for ${req.method} ${req.url} was not found` }));
app.listen(PORT, () => console.log(`Server has started and is listening on port ${PORT}`));
