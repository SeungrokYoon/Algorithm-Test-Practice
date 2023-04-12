const strArr = require('fs').readFileSync(0).toString().trim().split('\n')
const definitions = { equ: 'Equilateral', iso: 'Isosceles', sca: 'Scalene', inv: 'Invalid' }

const answer = strArr.reduce((acc, curr) => {
  const [a, b, c] = curr
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a)
  if (a >= b + c) {
    acc.push(definitions['inv'])
  } else if (a === b && b === c) {
    acc.push(definitions['equ'])
  } else if (a === b || b === c) {
    acc.push(definitions['iso'])
  } else {
    acc.push(definitions['sca'])
  }
  return acc
}, [])

console.log(answer.slice(0, answer.length - 1).join('\n'))
