const input = require('fs').readFileSync(0).toString().trim().split('\n').map(Number)
const N = input[0]

const dp = Array.from({ length: 2 }, () => Array.from({ length: N + 1 }, () => 0))
dp[0][1] = input[1]
dp[1][1] = input[1]
dp[0][2] = input[1] + input[2]
dp[1][2] = input[2]

for (let i = 3; i < N + 1; i++) {
  dp[0][i] = Math.max(dp[0][i - 3], dp[1][i - 3]) + input[i - 1] + input[i]
  dp[1][i] = Math.max(dp[0][i - 2], dp[1][i - 2]) + input[i]
}

console.log(Math.max(dp[0][N], dp[1][N]))
