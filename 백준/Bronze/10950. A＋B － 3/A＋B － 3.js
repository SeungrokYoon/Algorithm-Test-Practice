const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

const solution = (a, b) => {
  return a + b
}

const answer = []
for (let i = 1; i < N + 1; i++) {
  answer.push(solution(...input[i].split(' ').map(Number)))
}

console.log(answer.join('\n'))
