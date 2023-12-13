const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
console.log(
  input
    .slice(1)
    .map((l) => {
      return l
        .split(' ')
        .map(Number)
        .reduce((a, b) => a + b, 0)
    })
    .map((v, i) => `Case #${i + 1}: ${v}`)
    .join('\n'),
)
