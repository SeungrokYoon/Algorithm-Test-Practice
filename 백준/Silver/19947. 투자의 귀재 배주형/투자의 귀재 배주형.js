const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()

const [INITIAL_MONEY, INVESTMENT_YEAR] = input.split(' ').map(Number)

const A_INTEREST_RATE = 1.05
const A_PERIOD = 1
const B_INTEREST_RATE = 1.2
const B_PERIOD = 3
const C_INTEREST_RATE = 1.35
const C_PERIOD = 5

const DP = Array.from({ length: 4 }, () => Array.from({ length: INVESTMENT_YEAR + 1 }, () => 0))
DP[0][0] = INITIAL_MONEY
DP[1][0] = INITIAL_MONEY
DP[2][0] = INITIAL_MONEY
DP[3][0] = INITIAL_MONEY // 여기가 정답라인이 기록되는 곳

for (let year = 1; year < INVESTMENT_YEAR + 1; year++) {
  DP[0][year] = Math.floor(DP[3][year - A_PERIOD] * A_INTEREST_RATE)
  if (year - B_PERIOD >= 0) {
    DP[1][year] = Math.floor(DP[3][year - B_PERIOD] * B_INTEREST_RATE)
  } else {
    DP[1][year] = DP[1][year - 1]
  }
  if (year - C_PERIOD >= 0) {
    DP[2][year] = Math.floor(DP[3][year - C_PERIOD] * C_INTEREST_RATE)
  } else {
    DP[2][year] = DP[2][year - 1]
  }
  DP[3][year] = Math.max(DP[0][year], DP[1][year], DP[2][year])
}

console.log(Math.floor(DP[3][INVESTMENT_YEAR]))
