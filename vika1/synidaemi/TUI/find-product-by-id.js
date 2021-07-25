const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const products = [
    { id: 1, title: 'Banana', quantity: 14 },
    { id: 2, title: 'Apple', quantity: 6 },
    { id: 3, title: 'Orange Juice', quantity: 4 },
    { id: 4, title: 'Milk', quantity: 8 },
    { id: 5, title: 'Cheese', quantity: 5 },
    { id: 6, title: 'Oatmeal', quantity: 10 },
    { id: 7, title: 'Cheerios', quantity: 9 },
    { id: 8, title: 'Wholewheat bread', quantity: 3 },
    { id: 9, title: 'Pringles', quantity: 11 },
    { id: 10, title: 'Coffee', quantity: 12 },
];

rl.question('Enter product id: ', (answer) => {
    const id = Number(answer);
    const product = products.find((p) => p.id === id);

    if (!product) console.log(`Product with id ${id} could not be found`);
    else console.log(product);

    rl.close();
});
