const [[N], ...arr] = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const solution = (N, inputArr) => {
  let answer = 1000 * 1000 + 1
  const costs = Array.from({ length: 1 }, () => Array.from({ length: 3 }, () => 0)).concat(inputArr)
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: 3 }, () => 0))
  for (let fixedColor = 0; fixedColor < 3; fixedColor++) {
    for (let firstHouseColor = 0; firstHouseColor < 3; firstHouseColor++) {
      if (fixedColor === firstHouseColor) {
        dp[1][firstHouseColor] = costs[1][fixedColor]
      } else {
        dp[1][firstHouseColor] = 1001
      }
    }
    for (let i = 2; i < N + 1; i++) {
      dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0]
      dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1]
      dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2]
    }
    for (let lastHouseColor = 0; lastHouseColor < 3; lastHouseColor++) {
      if (fixedColor === lastHouseColor) continue
      answer = Math.min(dp[N][lastHouseColor], answer)
    }
  }

  return answer
}

console.log(solution(N, arr))
