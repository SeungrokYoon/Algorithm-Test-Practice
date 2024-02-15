const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, K] = input[0].split(' ').map(Number)
const dpTable = Array.from({ length: N }, () => Array.from({ length: N + 1 }, () => 0))
dpTable[0][0] = 1
for (let row = 1; row < N; row++) {
  for (let col = 0; col < row + 1; col++) {
    if (col === 0) {
      dpTable[row][col] = 1
    } else {
      dpTable[row][col] = dpTable[row - 1][col - 1] + dpTable[row - 1][col]
    }
  }
}

console.log(dpTable[N - 1][K - 1])
