const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const arr = input[1].split(' ').map(Number)

let max = 0
for (let i = 1; i < 10; i++) {
  for (let j = 1; j < i; j++) {
    let count = 0
    for (let idx = 0; idx < N; idx++) {
      if (arr[idx] === i || arr[idx] === j) {
        count++
      } else {
        max = Math.max(max, count)
        count = 0
      }
      max = Math.max(max, count)
    }
  }
}
console.log(max)
