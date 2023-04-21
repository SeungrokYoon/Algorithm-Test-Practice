const [N, cards, M, numbers] = require('fs').readFileSync(0).toString().trim().split('\n')
const set = new Set()
cards.split(' ').forEach((n) => set.add(n * 1))

const answer = numbers.split(' ').reduce((acc, curr) => {
  set.has(curr * 1) ? acc.push(1) : acc.push(0)
  return acc
}, [])

console.log(answer.join(' '))
