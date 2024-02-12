const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const dp = Array.from({ length: N + 1 }, () => Number.MAX_SAFE_INTEGER)
dp[0] = 0

for (let target = 1; target <= N; target++) {
  ;[2, 5].forEach((coin) => {
    if (coin > target) return
    dp[target] = Math.min(dp[target], dp[target - coin] + 1)
  })
}

console.log(dp[N] > N ? -1 : dp[N])
