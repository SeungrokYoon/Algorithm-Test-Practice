const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, K] = input[0].split(' ').map(Number)
const answer = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b)[K - 1]
console.log(answer)
