const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;

const products = [];

let nextID = 1;

app.use(cors());

app.use(express.json());

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const product = { ...req.body, id: nextID };
    nextID += 1;
    products.push(product);
    res.status(201).json(product);
});

app.use((req, res) => {
    res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` });
});

app.listen(PORT, () => console.log(`Server has started and is listening on port ${PORT}`));
