const N = require('fs').readFileSync(0).toString().trim() * 1
const dp = new Array(N + 1).fill(0)
dp[1] = 1
dp[2] = 2
for (let i = 3; i < N + 1; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746
}
console.log(dp[N])
