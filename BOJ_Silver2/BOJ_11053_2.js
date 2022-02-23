const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const arr = input[0].split(' ').map(Number)
const dp = Array.from({ length: N }, () => 1)
let answer = 1
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] >= arr[i]) continue
    dp[i] = Math.max(dp[i], dp[j] + 1)
  }
  answer = Math.max(answer, dp[i])
}
console.log(answer)
