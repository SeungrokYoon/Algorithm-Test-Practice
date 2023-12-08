const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const nString = 'IO'.repeat(N) + 'I'
const nStringLen = 2 * N + 1
const M = +input[1]
const S = input[2]

let answer = 0
for (let i = 0; i + nStringLen < M + 1; i++) {
  if (S[i] === 'O') continue
  if (S.slice(i, i + nStringLen) === nString) {
    answer++
  }
}

console.log(answer)
