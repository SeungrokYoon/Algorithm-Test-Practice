const matrix = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const answer = matrix.reduce(
  (acc, line, x) => {
    line.forEach((n, y) => {
      if (acc.maxValue < n) {
        acc.maxValue = n
        acc.position = `${x + 1} ${y + 1}`
      }
    })
    return acc
  },
  { position: '1 1', maxValue: 0 },
)

console.log(answer.maxValue)
console.log(answer.position)
