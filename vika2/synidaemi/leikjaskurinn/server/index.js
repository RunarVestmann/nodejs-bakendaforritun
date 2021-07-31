const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = 4000;

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));
app.use(cors());
app.use(express.json());

const { products } = require('./data');

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);
    if (!product) res.status(404).json({ message: `Product with id ${id} was not found` });
    else res.json(product);
});

app.post('/contact', (req, res) => {
    // TODO: Send an e-mail
    res.json(req.body);
});

app.post('/order', (req, res) => {
    // TODO: Store the order in a database
    res.json(req.body);
});

app.use((req, res) => {
    res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` });
});

app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}`);
});
