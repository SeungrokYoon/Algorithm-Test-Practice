const input = require('fs').readFileSync('test/test.txt').toString().trim() * 1
const answer = BigInt(input) * BigInt(input) * BigInt(input)
console.log(answer.toString())
console.log(3)
