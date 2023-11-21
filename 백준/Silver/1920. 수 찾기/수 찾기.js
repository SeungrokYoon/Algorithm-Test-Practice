const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = [+input[0], +input[2]]

const set = new Set(input[1].split(' ').map(Number))
const answer = []

input[3]
  .split(' ')
  .map(Number)
  .forEach((n) => (set.has(n) ? answer.push(1) : answer.push(0)))

console.log(answer.join('\n'))
