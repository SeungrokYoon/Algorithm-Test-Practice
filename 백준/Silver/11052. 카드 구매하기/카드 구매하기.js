const input = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const price = [0].concat(input[1].split(' ').map(Number))
const dp = Array(N + 1).fill(0)
dp[1] = price[1]

for (let i = 2; i < N + 1; i++) {
  for (let j = 1; j <= i - j; j++) {
    dp[i] = Math.max(dp[i], price[i], dp[j] + dp[i - j])
  }
}

console.log(dp[N])
