const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const arr = input.shift().split(' ').map(Number)

const solution = (N, arr) => {
  const dp = Array.from({ length: N }, () => 1)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] <= arr[i]) continue
      dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
  return Math.max(...dp)
}
console.log(solution(N, arr))
