const input =
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
    .toString()
    .trim() * 1

const dp = Array.from({ length: input + 1 }, (_, i) => i)

for (let i = 2; i < input + 1; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2])
}

console.log(dp[input].toString())
