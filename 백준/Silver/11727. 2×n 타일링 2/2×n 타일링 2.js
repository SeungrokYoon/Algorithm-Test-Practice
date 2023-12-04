const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const dp = Array.from({ length: N + 1 }, () => 0)
dp[1] = 1
dp[2] = 3
for (let i = 3; i < N + 1; i++) {
  dp[i] = (2 * dp[i - 2] + dp[i - 1]) % 10007
}

console.log(dp[N])
