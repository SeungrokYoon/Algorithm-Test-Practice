const [A, B] = require('fs').readFileSync('test/test.txt').toString().trim().split(' ').map(BigInt)

console.log((A + B).toString())
