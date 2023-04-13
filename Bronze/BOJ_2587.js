const inputArr = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
const sortedAsc = inputArr.sort((a, b) => a - b)

const average = sortedAsc.reduce((acc, curr) => acc + curr, 0) / sortedAsc.length
const middle = sortedAsc[Math.floor(sortedAsc.length / 2)]

console.log(average)
console.log(middle)
