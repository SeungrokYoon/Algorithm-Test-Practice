const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const dpTable = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => 0))

//row끼리 dp하기
input.slice(1, N + 1).map((l, row) =>
  l
    .split(' ')
    .map(Number)
    .forEach((value, col) => {
      dpTable[row + 1][col + 1] = dpTable[row + 1][col] + value
    }),
)

const answer = []
//row를 돌면서 dp합 구하기
input
  .slice(N + 1)
  .map((l) => l.split(' ').map(Number))
  .forEach(([x1, y1, x2, y2]) => {
    let sum = 0
    for (let row = x1; row <= x2; row++) {
      sum += dpTable[row][y2] - dpTable[row][y1 - 1]
    }
    answer.push(sum)
  })
console.log(answer.join('\n'))
