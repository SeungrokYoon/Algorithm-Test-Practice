const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]
const dp = input[1]
  .split(' ')
  .map(Number)
  .reduce(
    (acc, v, i) => {
      acc[0][i] = v
      return acc
    },
    /**
     * 1 row 증감  0 row
     * 2 row 현재까지 증가한 길이
     * 3 row 지금 회차까지 발견된 증가하는 길이들 중 최대길이
     * 4 row 현재까지 감소한 길이
     * 5 row 지금 회차까지 발견된 길이들 중 최대길이
     */
    Array.from({ length: 6 }, () => Array.from({ length: N }, () => 0)),
  )

dp[1][0] = 0
dp[2][0] = 1
dp[3][0] = 1
dp[4][0] = 1
dp[5][0] = 1

for (let i = 1; i < N; i++) {
  const curr = dp[0][i]
  const prev = dp[0][i - 1]
  //{maxIncreasingLen: a}
  if (curr === prev) {
    //이전 숫자와 같으면, 증가, 감소 테이블을 둘 다 업데이트시켜줘야 함.
    dp[1][i] = 0
    dp[2][i] = dp[2][i - 1] + 1
    dp[3][i] = Math.max(dp[3][i - 1], dp[2][i])
    dp[4][i] = dp[4][i - 1] + 1
    dp[5][i] = Math.max(dp[5][i - 1], dp[4][i])
  } else if (curr > prev) {
    //증가하는 경우
    dp[1][i] = 1
    dp[2][i] = dp[2][i - 1] + 1
    dp[3][i] = Math.max(dp[3][i - 1], dp[2][i])
    //증가하는 경우에는, 감소하는 케이스에 대해서 그대로 유지해야 함
    dp[4][i] = 1
    dp[5][i] = dp[5][i - 1]
  } else {
    //감소하는 경우
    dp[1][i] = -1
    dp[4][i] = dp[4][i - 1] + 1
    dp[5][i] = Math.max(dp[5][i - 1], dp[4][i])
    //감소하는 경우에는, 증가하는 케이스에 대해서 그대로 유지해야 함
    dp[2][i] = 1
    dp[3][i] = dp[3][i - 1]
  }
}

// console.log(dp.map((l) => l.join(' ')).join('\n'))
console.log(Math.max(dp[3][N - 1], dp[5][N - 1]))
