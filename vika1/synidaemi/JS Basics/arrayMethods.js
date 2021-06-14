const array = [1, 2, 3, 4];

// find: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
const value = array.find((value) => value !== 3);

// forEach: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
array.forEach((value) => {
    console.log(value);
});

// join: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
console.log(array.join(''));

// map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const newArray = array.map((value) => {
    return value.toString();
});
console.log(array);
console.log(newArray);

// filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const filteredArray = array.filter((value) => value === 3);
console.log(array);
console.log(filteredArray);
