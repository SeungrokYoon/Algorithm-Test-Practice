const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift() * 1
const table = input.map((i) => i.split(' ').map((j) => +j))
const temp = new Array(N).fill(0)
const dp = temp.fill(0).map((i) => new Array(N).fill(0))
dp[0][0] = 1

const solution = () => {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const nextHop = table[row][col]
      if (dp[row][col] === 0 || nextHop === 0 || (row === N - 1 && col === N - 1)) continue
      if (row + nextHop < N) {
        const newInt = BigInt(dp[row + nextHop][col]) + BigInt(dp[row][col])
        dp[row + nextHop][col] = BigInt(newInt)
      }
      if (col + nextHop < N) {
        const newInt = BigInt(dp[row][col + nextHop]) + BigInt(dp[row][col])
        dp[row][col + nextHop] = BigInt(newInt)
      }
    }
  }
  const result = dp[N - 1][N - 1]
  console.log(result.toString())
}

solution()
