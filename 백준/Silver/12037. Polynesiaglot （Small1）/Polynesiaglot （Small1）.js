const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const test = +input[0]
const answer = []

input.slice(1).forEach((s) => {
  const [C, V, L] = s.split(' ').map(Number)
  const dp = Array.from({ length: L + 1 }, () => BigInt(1))
  dp[1] = BigInt(V)
  for (let i = 2; i < L + 1; i++) {
    dp[i] = (dp[i - 1] * BigInt(V) + dp[i - 2] * BigInt(C) * BigInt(V)) % BigInt(10 ** 9 + 7)
  }
  answer.push(dp[L].toString())
})

console.log(answer.map((s, i) => `Case #${i + 1}: ${s}`).join('\n'))
