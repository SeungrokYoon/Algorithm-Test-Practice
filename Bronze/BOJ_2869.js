const [A, B, V] = require('fs').readFileSync(0).toString().trim().split(' ').map(Number)

console.log(Math.ceil((V - A) / (A - B)) + 1)
