const hours = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

hours.pop()

const dp = Array.from({ length: 491 }, () => 0)
dp[1] = 1

for (let i = 2; i < 491; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2])
}

const getAnswerStr = (hour) => {
  return `Hour ${hour}: ${dp[hour].toString()} cow(s) affected`
}

const answer = hours.map((h) => getAnswerStr(h)).join('\n')
console.log(answer)
