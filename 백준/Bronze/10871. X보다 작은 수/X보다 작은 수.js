const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, X] = input[0].split(' ').map(Number)
console.log(
  input[1]
    .split(' ')
    .map(Number)
    .filter((n) => n < X)
    .join(' '),
)
