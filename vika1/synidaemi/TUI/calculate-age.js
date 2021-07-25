const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function calculateAge(birthDate) {
    const currentDate = new Date();

    const hasHadBirthdayThisYear =
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());

    const yearDifference = currentDate.getFullYear() - birthDate.getFullYear();

    const age = hasHadBirthdayThisYear ? yearDifference : yearDifference - 1;

    return age;
}

rl.question('Enter date of birth(DD-MM-YYY): ', (answer) => {
    const [date, month, year] = answer.split('-');

    const birthDate = new Date(year, month - 1, date);

    const age = calculateAge(birthDate);

    console.log(`Age: ${age}`);

    rl.close();
});
