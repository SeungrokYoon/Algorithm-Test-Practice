const [n, ...inputArr] = require('fs').readFileSync(0).toString().trim().split('\n')
const [N, M] = n.split(' ').map(Number)

const nSet = new Set(inputArr.slice(0, N))
const mStrings = inputArr.slice(N)

const answer = mStrings.reduce((acc, curr) => (nSet.has(curr) ? acc + 1 : acc), 0)
console.log(answer)
