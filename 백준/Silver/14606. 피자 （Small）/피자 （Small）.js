const N =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const dp = Array.from({ length: N + 1 }, () => 0)
for (let i = 2; i <= N; i++) {
  for (let j = 1; j <= i - j; j++) {
    dp[i] = Math.max(dp[i], j * (i - j) + dp[j] + dp[i - j])
  }
}

console.log(dp[N])
