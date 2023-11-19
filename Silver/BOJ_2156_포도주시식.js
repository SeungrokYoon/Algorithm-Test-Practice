const [N, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const inputArr = [0, 0].concat(arr)
const dp = Array.from({ length: 2 }, () => Array.from({ length: N + 2 }, () => 0))

for (let i = 2; i < N + 2; i++) {
  dp[0][i] = Math.max(dp[1][i - 2] + inputArr[i - 1] + inputArr[i], dp[1][i - 1] + inputArr[i])
  dp[1][i] = Math.max(dp[0][i - 1], dp[0][i - 2])
}

console.log(Math.max(dp[0][N + 1], dp[1][N + 1]))
