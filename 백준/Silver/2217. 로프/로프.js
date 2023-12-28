const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
let answer = 0
input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b)
  .forEach((w, i) => {
    answer = Math.max(answer, w * (N - i))
  })

console.log(answer)
