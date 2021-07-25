const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const minNumber = 1;
const maxNumber = 100;
const randomNumber = getRandomIntInclusive(minNumber, maxNumber);

rl.question(`Guess a number between ${minNumber} and ${maxNumber}(inclusive): `, (answer) => {
    if (Number(answer) === randomNumber) console.log('You guessed the correct number!');
    else console.log('You guessed the wrong number');

    console.log(`The number was ${randomNumber}`);
    rl.close();
});
