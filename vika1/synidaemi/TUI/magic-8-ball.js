const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes – definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy, try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

rl.question('What would you like to ask the ball? ', (answer) => {
    const randomIndex = getRandomInt(messages.length);
    const response = messages[randomIndex];
    console.log(response);
    rl.close();
});
