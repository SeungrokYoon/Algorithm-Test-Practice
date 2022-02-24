const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const arr = input.shift().split(' ').map(Number)

const solution = (N, arr) => {
  let max = 1
  const dp = Array.from({ length: N }, () => 1)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] <= arr[i]) continue
      dp[i] = Math.max(dp[i], dp[j] + 1)
      max = Math.max(dp[i], max)
    }
  }
  return max
}
console.log(solution(N, arr))
