const directory = process.platform === 'linux' ? 0 : __dirname + '/test.txt'
const input = require('fs').readFileSync(directory).toString().trim().split('\n')
const N = input[0] * 1

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: N }, () => 0))

for (let n = 1; n < N + 1; n++) {
  const currRow = input[n].split(' ').map(Number)
  for (let i = 0; i < n; i++) {
    const prevLeftIndex = i - 1
    const prevRightIndex = i
    const hasLeft = prevLeftIndex >= 0 && prevLeftIndex < n
    const hasRight = prevRightIndex >= 0 && prevRightIndex < n
    const selectedPrevNum = Math.max(
      hasLeft ? dp[n - 1][prevLeftIndex] : 0,
      hasRight ? dp[n - 1][prevRightIndex] : 0,
    )
    dp[n][i] = currRow[i] + selectedPrevNum
  }
}

console.log(Math.max(...dp[N]))
