const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;

const people = [
    {
        id: 1,
        name: 'Bob',
    },
];

let nextID = 2;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/people', (req, res) => {
    res.json(people);
});

app.get('/people/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = people.find((p) => p.id === id);
    if (!person) res.status(404).json({ message: `Person with id ${id} was not found` });
    else res.json(person);
});

app.post('/people', (req, res) => {
    const person = { ...req.body, id: nextID };
    nextID += 1;
    people.push(person);
    res.status(201).json(req.body);
});

// This is the default route that becomes active if no other route matches the request url
app.use((req, res) => {
    res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` });
});

app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}`);
});
