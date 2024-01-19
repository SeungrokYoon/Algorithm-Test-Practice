const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const [N, M_A] = input[0]
const matrixA = input.slice(1, 1 + N)
const [M_B, K] = input[1 + N]
const matrixB = input.slice(2 + N)
const answerMatrix = Array.from(
  { length: N },
  () => Array.from({ length: K }),
  () => 0,
)
for (let aRow = 0; aRow < N; aRow++) {
  for (let bCol = 0; bCol < K; bCol++) {
    let sum = 0
    for (let bRow = 0; bRow < M_A; bRow++) {
      sum += matrixA[aRow][bRow] * matrixB[bRow][bCol]
    }
    answerMatrix[aRow][bCol] = sum
  }
}
console.log(answerMatrix.map((row) => row.join(' ')).join('\n'))
