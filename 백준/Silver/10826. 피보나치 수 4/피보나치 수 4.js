const input = +require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const dp = Array.from({ length: input + 1 }, () => BigInt(0))
dp[1] = BigInt(1)
dp[2] = BigInt(1)
for (let i = 2; i < input + 1; i++) {
  dp[i] = dp[i - 1] + dp[i - 2]
}
console.log(dp[input].toString())
