const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

let i = 1
const answer = []
while (i < input.length) {
  const [N, M] = input[i].split(' ').map(Number)
  answer.push(N-1)
  i += M + 1
}
console.log(answer.join('\n'))
