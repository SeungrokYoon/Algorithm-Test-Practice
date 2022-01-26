const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = input[0] * 1
const arr = input[1]
  .split(' ')
  .map((i) => +i)
  .sort((a, b) => a - b)
let answer = 0

arr.forEach((value, index) => {
  answer += value * (N - index)
})

console.log(answer)
