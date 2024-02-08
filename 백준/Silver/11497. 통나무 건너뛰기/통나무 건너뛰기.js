const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const TESTS = +input[0]
let idx = 1
const answer = []
while (idx < input.length) {
  const N = +input[idx]
  const arr = input[idx + 1]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
  let max = arr[1] - arr[0]
  for (let i = 0; i + 2 < N; i += 2) {
    const former = arr[i]
    const latter = arr[i + 2]
    max = Math.max(latter - former, max)
  }
  for (let i = 1; i + 2 < N; i += 2) {
    const former = arr[i]
    const latter = arr[i + 2]
    max = Math.max(latter - former, max)
  }
  answer.push(max)
  idx += 2
}

console.log(answer.join('\n'))
