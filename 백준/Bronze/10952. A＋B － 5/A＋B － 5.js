const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const solution = (a, b) => {
  return a + b
}

const answer = []
for (let i = 0; i < input.length; i++) {
  answer.push(solution(...input[i].split(' ').map(Number)))
}

answer.pop()

console.log(answer.join('\n'))
