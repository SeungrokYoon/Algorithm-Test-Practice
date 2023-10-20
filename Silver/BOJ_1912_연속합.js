const directory = process.platform === 'linux' ? 0 : __dirname + '/test.txt'
let [n, input] = require('fs').readFileSync(directory).toString().trim().split('\n')
n = n * 1
input = input.split(' ').map(Number)
input.unshift(0)

const dp = Array.from({ length: 2 }, () => Array.from({ length: n + 1 }, () => -1001))

for (let i = 1; i < n + 1; i++) {
  const currentNum = input[i]
  const prevSum = dp[0][i - 1]
  const prevMax = dp[1][i - 1]
  dp[0][i] = Math.max(currentNum, prevSum + currentNum)
  dp[1][i] = Math.max(prevMax, currentNum, prevSum + currentNum)
}

console.log(dp[1][n])
