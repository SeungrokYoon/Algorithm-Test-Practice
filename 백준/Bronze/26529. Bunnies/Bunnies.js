const days = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

days.shift()

const dp = Array.from({ length: 491 }, () => 0)
dp[1] = 1

for (let i = 2; i < 47; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2])
}

const getAnswerStr = (day) => {
  return dp[day + 1].toString()
}

const answer = days.map((day) => getAnswerStr(day)).join('\n')
console.log(answer)
