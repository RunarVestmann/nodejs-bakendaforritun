const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter numbers seperated by a space: ', (answer) => {
    const numberStrings = answer.split(' ');

    const numbers = numberStrings.map((numberString) => Number(numberString));

    const sum = numbers.reduce((total, current) => total + current, 0);

    console.log(`The mean value is ${sum / numbers.length}`);

    rl.close();
});
