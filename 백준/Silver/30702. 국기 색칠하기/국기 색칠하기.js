const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
const [N, M] = input[0].split(' ').map(Number)
const flagsA = input.slice(1, 1 + N).map((l) => l.split(''))
const visitedA = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))
const flagsB = input.slice(1 + N).map((l) => l.split(''))

for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    if (visitedA[row][col]) continue
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
    const currColor = flagsA[row][col]
    const nextColor = flagsB[row][col]
    const queue = [[row, col, nextColor]]
    while (queue.length) {
      const [r, c, color] = queue.pop()
      visitedA[r][c] = 1
      flagsA[r][c] = color
      for (let i = 0; i < 4; i++) {
        const [nR, nC] = [r + dx[i], c + dy[i]]
        if (
          nR >= 0 &&
          nC >= 0 &&
          nR < N &&
          nC < M &&
          visitedA[nR][nC] === 0 &&
          flagsA[nR][nC] === currColor
        ) {
          queue.push([nR, nC, color])
        }
      }
    }
  }
}

let allSame = true
for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    if (flagsA[row][col] !== flagsB[row][col]) {
      allSame = false
      break
    }
  }
}

console.log(allSame ? 'YES' : 'NO')
