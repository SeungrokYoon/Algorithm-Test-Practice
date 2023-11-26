const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const N = input[0]
const data = input.slice(1).sort((a, b) => a - b)
const removedPeople = Math.round(N * 0.15)
const answer = Math.round(
  data.slice(removedPeople, data.length - removedPeople).reduce((acc, curr) => acc + curr, 0) /
    (N - 2 * removedPeople),
)

console.log(N === 0 ? 0 : answer)
