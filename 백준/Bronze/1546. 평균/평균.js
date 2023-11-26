const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const scores = input[1].split(' ').map(Number)
const max = Math.max(...scores)
const answer = scores.reduce((acc, curr) => {
  return acc + ((curr / max) * 100) / +input[0]
}, 0)
console.log(answer)
