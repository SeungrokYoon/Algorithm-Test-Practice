//RGB 거리
const [[N], ...arr] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const solution = (N, inputArr) => {
  const costs = Array.from({ length: 1 }, () => Array.from({ length: 3 }, () => 0)).concat(inputArr)
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: 3 }, () => 0))

  for (let i = 1; i < N + 1; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0]
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1]
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2]
  }
  return Math.min(dp[N][0], dp[N][1], dp[N][2])
}

console.log(solution(N, arr))
