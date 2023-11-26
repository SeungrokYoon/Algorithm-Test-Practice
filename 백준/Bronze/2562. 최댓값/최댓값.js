const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

console.log(
  input
    .map((v, i) => [v, i + 1])
    .sort((a, b) => a[0] - b[0])
    .pop()
    .join('\n'),
)
