const inputArr = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const N = inputArr.shift()

const solution = () => {
  const dp = Array.from({ length: 3 }, () => Array.from({ length: N + 2 }, () => 0))
  for (let index = 2; index < N + 2; index++) {
    dp[0][index] = Math.max(dp[1][index - 1], dp[2][index - 1]) + inputArr[index - 2]
    dp[1][index] = dp[0][index - 1]
    dp[2][index] = dp[0][index - 2] + inputArr[index - 2]
  }
  return Math.max(dp[0][N + 1], dp[2][N + 1])
}

console.log(solution())
