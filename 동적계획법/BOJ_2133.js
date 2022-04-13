const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const dp = Array.from({ length: N + 1 }, () => 0)
dp[0] = 1
dp[2] = 3
for (let i = 4; i < N + 1; i++) {
  dp[i] = dp[i - 2] * 3
  for (let j = 4; j < i + 1; j += 2) {
    dp[i] += dp[i - j] * 2
  }
}
console.log(dp[N])
