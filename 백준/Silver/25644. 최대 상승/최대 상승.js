const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = +input[0]

const DP_TABLE = Array.from({ length: 3 }, () => Array.from({ length: N }, () => 0))
/**
 * DP_TABLE[0][] : 각 날짜의 주가
 * DP_TABLE[1][] : 각 날짜에서 팔았을 때의 역대 최대 이윤 업데이트 테이블
 * DP_TABLE[2][] : 각 날짜 기준으로 최저 주가에 대한 기록
 *
 */

input[1]
  .split(' ')
  .map(Number)
  .forEach((v, i) => {
    DP_TABLE[0][i] = v
  })
DP_TABLE[2][0] = DP_TABLE[0][0]

for (let ithDay = 1; ithDay < N; ithDay++) {
  DP_TABLE[1][ithDay] = Math.max(
    DP_TABLE[0][ithDay] - DP_TABLE[2][ithDay - 1], // ithDay에 팔았을 때의 이윤
    DP_TABLE[1][ithDay - 1], // 이전날까지 기준으로 거래했을 때 기록한 최대 이윤
    0, // 샀다가 다시 파는 경우
  )
  DP_TABLE[2][ithDay] = Math.min(DP_TABLE[2][ithDay - 1], DP_TABLE[0][ithDay])
}

console.log(DP_TABLE[1][N - 1])
