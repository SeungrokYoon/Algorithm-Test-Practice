const N = require('fs').readFileSync(0).toString().trim() * 1

const dp = Array.from({ length: N + 1 }, () => 0)
dp[0] = 1000000 + 1

for (let i = 2; i < N + 1; i++) {
  //case1- 3으로 나누어 떨어지는 경우
  const case1 = i % 3 === 0 ? dp[i / 3] : dp[0]
  //case2 - 2로 나누어 떨어지는 경우
  const case2 = i % 2 === 0 ? dp[i / 2] : dp[0]
  //case3 - 1을 빼는 경우
  const case3 = dp[i - 1]
  dp[i] = Math.min(case1, case2, case3) + 1
}

console.log(dp[N])
