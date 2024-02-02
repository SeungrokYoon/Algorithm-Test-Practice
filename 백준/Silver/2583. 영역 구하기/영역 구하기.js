const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const map = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))
input.slice(1).forEach((l) => {
  const [col1, row1, col2, row2] = l.split(' ').map(Number)
  for (let r = row1; r < row2; r++) {
    for (let c = col1; c < col2; c++) {
      map[r][c] = 1
    }
  }
})

let areaCounter = 0
const areaArr = []
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) continue
    areaCounter++
    let area = 1
    map[i][j] = 1
    const queue = [[i, j]]
    while (queue.length) {
      const dR = [0, 1, 0, -1]
      const dC = [1, 0, -1, 0]
      const [row, col] = queue.shift()
      for (let idx = 0; idx < 4; idx++) {
        const nR = row + dR[idx]
        const nC = col + dC[idx]
        if (nR < 0 || nC < 0 || nR >= N || nC >= M || map[nR][nC] === 1) continue
        map[nR][nC] = 1
        area++
        queue.push([nR, nC])
      }
    }
    areaArr.push(area)
  }
}

console.log(areaCounter)
console.log(areaArr.sort((a, b) => a - b).join(' '))
