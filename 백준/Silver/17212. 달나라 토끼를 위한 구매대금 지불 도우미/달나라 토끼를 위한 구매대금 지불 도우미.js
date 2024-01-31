const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const N = +input
const SEVEN = 7
const FIVE = 5
const TWO = 2
const ONE = 1

const dp = Array.from({ length: N + 1 }, () => 0)
dp[1] = 1
dp[2] = 1
dp[5] = 1
dp[7] = 1

for (let price = 3; price <= N; price++) {
  if (dp[price] > 0) continue
  dp[price] = Math.min(
    price - SEVEN >= 0 ? dp[price - SEVEN] + dp[price - (price - SEVEN)] : N + 1,
    price - FIVE >= 0 ? dp[price - FIVE] + dp[price - (price - FIVE)] : N + 1,
    price - TWO >= 0 ? dp[price - TWO] + dp[price - (price - TWO)] : N + 1,
    dp[price - ONE] + 1,
  )
}

console.log(dp[N])
