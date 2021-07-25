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

app.patch('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) res.status(404).json({ message: `Could not find product with id ${id}` });
    else {
        if (req.body.title) product.title = req.body.title;
        if (req.body.quantity) product.quantity = req.body.quantity;
        res.json(product);
    }
});

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) res.status(404).json({ message: `Could not find product with id ${id}` });
    else {
        const index = products.indexOf(product);
        products.splice(index, 1);
        res.json(product);
    }
});

app.use((req, res) => {
    res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` });
});

app.listen(PORT, () => console.log(`Server has started and is listening on port ${PORT}`));
