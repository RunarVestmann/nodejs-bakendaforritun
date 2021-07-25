const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const options = ['Rock', 'Paper', 'Scissors'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showResult(computerOption, weakness) {
    console.log(`The computer picked ${computerOption}`);
    if (computerOption.startsWith(weakness)) console.log('You lost');
    else console.log('You won!');
}

rl.question('(R)ock (P)aper (S)cissors: ', (answer) => {
    const playerOption = answer.toUpperCase();
    const computerOption = options[getRandomInt(options.length)];

    if (playerOption.startsWith(computerOption[0])) {
        console.log(`The computer picked ${computerOption}`);
        console.log("It's a tie");
    }

    // Player picked Rock
    else if (playerOption.startsWith('R')) showResult(computerOption, 'P');
    // Player picked Paper
    else if (playerOption.startsWith('P')) showResult(computerOption, 'S');
    // Player picked Scissors
    else if (playerOption.startsWith('S')) showResult(computerOption, 'R');
    // Player did not pick a valid option
    else console.log('Invalid option selected');

    rl.close();
});
