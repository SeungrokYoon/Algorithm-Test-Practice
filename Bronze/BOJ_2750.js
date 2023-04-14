const [n, ...inputArr] = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
const sorted = inputArr.sort((a, b) => a - b)
console.log(sorted.join('\n'))
